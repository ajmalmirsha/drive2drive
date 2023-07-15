import { useEffect, useRef, useState } from "react"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { adminApi } from '../../../utils/Apis'
import { useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'
import { toast as toaster, ToastContainer } from 'react-toastify'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from "primereact/button"
import Spinner from "../../../common/spinners/Spinner"

export default function Banner() {
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState([]);
  const { adminAuthenticationHandler } = useErrorHandler();
  const toast = useRef(null);
  const fileInputRef = useRef(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedBannerId, setSelectedBannerId] = useState(null);

  const [ loading, setLoading ] = useState(false)
  const [ submitLoading, setSubmitLoading ] = useState(false)
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  
  const accept = (bannerId) => {
    
      setLoading(true)
    adminApi.delete(`/delete/banner/${bannerId}`).then(({ data: { message, data } }) => {
      setLoading(false)
      toast?.current?.show({ severity: 'info', summary: 'Confirmed', detail: message, life: 3000 });
      setDialogVisible(false);
      setBanner(data);
    }).catch(err => {
      adminAuthenticationHandler(err);
    });
  };


  useEffect(() => {
    setLoading(true)
    adminApi.get('/get/all/banners').then(({ data: { data } }) => {
      setLoading(false)
      setBanner(data);
    }).catch(err => {
      adminAuthenticationHandler(err);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!image){
     return toaster.error('upload image');
    }
    setSubmitLoading(true)
    const formData = new FormData();
    formData.append('image', image);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    adminApi.post('/add/banner', formData, config).then(({ data: { data, message } }) => {
      setSubmitLoading(false)
      toaster.success(message);
      resetFileInput();
      setImage({});
      setBanner(data);
    }).catch(err => {
      adminAuthenticationHandler(err);
    });
  };

  const deleteConfirm = (bannerId) => {
    setSelectedBannerId(bannerId); 
    setDialogVisible(true); 
  };

  const handleDialogAccept = () => {
    accept(selectedBannerId); 
  };

  const handleDialogReject = () => {
    setDialogVisible(false);
  };

  return (
    <div className="col-md-10 col-sm-9 mt-5">
      <div className="d-flex mb-2 justify-content-between">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-primary">Add banner</button>
      </div>



      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Add Banner</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            { submitLoading ? <Spinner/> :
            <form onSubmit={handleSubmit}>
              <div class="modal-body ">
                <label htmlFor="">Image</label>
                {image?.name && <img className="w-100 my-3" src={URL.createObjectURL(image)} alt="" />}
                <input ref={fileInputRef} onChange={(e) => {
                  const files = e.target.files;
                  if (files && e.target.files?.length !== 0  ) {
                    const imageFiles = Array.from(files).filter(file => file.type.includes('image'));
                    if (imageFiles.length > 0) {
                      setImage(e.target.files[0])
                    }
                  }
                   }} accept="image/*" type="file" />
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">upload image</button>
              </div>
            </form>
           }
          </div>
        </div>
      </div>
      { loading ? <Spinner/> :

      <Table className="custom-table" >
        <Thead>
          <Tr>
            <Th>Banner</Th>
          </Tr>
        </Thead>
        <Tbody>
          {banner.length > 0 ? banner.map((x) => {
            return (
              <Tr >
                <Td><img className="w-100 my-4" src={x?.image?.url} alt="" /></Td>
                <Td>   <Toast ref={toast} />
                  {/* <ConfirmDialog visible={dialogVisible}  onHide={() => setDialogVisible(false)} ref={dialogRef} /> */}
                  <div className="card flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={() => deleteConfirm(x._id)} icon="pi pi-times" label="Delete" />
                  </div>
                </Td>
              </Tr>
            )
          }) : <p className="text-center" >add the first banner</p>
          }


        </Tbody>
        <ConfirmDialog visible={dialogVisible} onHide={handleDialogReject} accept={handleDialogAccept} reject={handleDialogReject}
          message="Do you want to delete this record?" header="Delete Confirmation" icon="pi pi-info-circle" acceptClassName="p-button-danger" />
      </Table>
  }
      <ToastContainer />
    </div>
  )
}