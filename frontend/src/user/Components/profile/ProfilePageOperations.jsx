import { setUserDetails } from "../../../redux/userSlice";
import { toast } from "react-toastify";
import { userApi } from "../../../utils/Apis";

    
 export  function uploadProfileImage  (reduxUser,image,setImage,dispatch,authenticationHandler) {

    const formData = new FormData()
    formData.append('image', image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        userId: reduxUser.id
      },
      withCredentials: true,
    };

    if (image) {

      userApi.post('/upload-profile-image', formData, config).then((response) => {
        setImage('')
        dispatch(
          setUserDetails({
            id: response.data.user._id,
            username: response.data.user?.username,
            email: response.data.user?.email,
            phone: response.data.user?.phone,
            image: response.data.user?.image,
            dob: response.data.user?.dob,
            license: {
              front: response.data.user.license?.front,
              back: response.data.user.license?.rear,
            }
          })
        )
        toast.success(response.data.message)
      }).catch(err => {
        authenticationHandler(err)
      })
    }
  }


  export  function handleSubmit(user,dispatch,userauthenticationHandler) {
    const { username, email } = user
        if (!username) {
            toast.error('username required')
        } else if (!email) {
            toast.error('email required !')
        } else {
            userApi.post('/update-user', { user }).then(async({data,status}) =>{
               if (status === 200) {
        
              const { userData } = data
              dispatch(
                setUserDetails({
                  id: userData._id,
                  username: userData.username,
                  email: userData.email,
                  phone: userData?.phone,
                  image: userData?.image,
                  dob: userData?.dob,
                  license: {
                    front: userData.license?.front,
                    back: userData.license?.rear,
                  }
                })
              )
              toast.success(data.message)
            } else {
              toast.error(data.message)
            }
            } ).catch( err => {
              err.response.status == 501 ? toast.error(err.response.data.message) :            
              userauthenticationHandler(err)
            })
          }
  }

  export function uploadLicense(license,reduxUser,dispatch,setLicenseUploaded,authenticationHandler,setLoading) {
    setLoading(true)
    const formData = new FormData()
    formData.append('license[front]', license.front);
    formData.append('license[back]', license.back);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        userId: reduxUser.id
      },
      withCredentials: true,
    };
    userApi.post('/add-license', formData, config).then(({ data }) => {
      setLoading(false)
      dispatch(
        setUserDetails(
          {
            id: data.user._id,
            username: data.user.username,
            email: data.user.email,
            phone: data.user?.phone,
            image: data.user?.image,
            dob: data.user?.dob,
            license: {
              front: data.user.license?.front,
              back: data.user.license?.rear,
            }
          }
        )
        )
        setLicenseUploaded(false)
      toast.success('license updated successfully')
     
    })
      .catch(err => {
        authenticationHandler(err)
      });
  }


  
    export  function validPhone (phoneNumber,setPhoneValidation)  {
    const phoneRegex = /^(\+?91|0)?[6789]\d{9}$/;

    if (phoneRegex.test(phoneNumber)) {
      setPhoneValidation(true)
    } else {
      setPhoneValidation(false)
    }
  }
  export function verifyEmial (email,setEmailVerification)  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setEmailVerification(true)
    } else {
      setEmailVerification(false)
    }

  }
  