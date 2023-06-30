

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { adminApi } from '../../../utils/Apis';
import { InputNumber } from 'primereact/inputnumber';
import {  useErrorHandler } from '../../../user/ErrorHandlers/ErrorHandler'

export default function Coupon() {
    const [nodes, setNodes] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [visible, setVisible] = useState(false);
    const [value2, setValue2] = useState(null);
    const { adminAuthenticationHandler } = useErrorHandler()
    useEffect(() => {
        adminApi.get('/get/all/coupons').then(({data:{data}}) => {
            setNodes(data)
            console.log(data,8764);
        }) .catch((err) => {
            adminAuthenticationHandler(err)
          });
    },[])
    const addCoupon = ( data ) => {
        console.log('gone');
        adminApi.post('/add-coupon',data).then(({data:{message}}) => {
         show(message)
         setTimeout(()=> {
            setVisible(false)
         },1000)
        }).catch(err => {
            console.log(err);
            err.response.status === 409 && toast.current.show({ severity: 'error', summary: err.response.data.message });
            adminAuthenticationHandler(err)
        })
    }

    const getHeader = () => {
        return (
            <div className="row">
                <div className="col-md-6">
                <button className='btn btn-primary' onClick={() => setVisible(true)} >Add Coupon</button>
                </div>
            <div className="d-flex col-md-6 justify-content-end">
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Global Search" />
            </div>
            </div>
        );
    };

    let header = getHeader();
    const toast = useRef(null);

  const show = (data) => {
    toast.current.show({ severity: 'success', summary: data });
  };
  
  const formik = useFormik({
    initialValues: {
      name: '',
      code: '',
      expire: '',
      disPercent:null
    },
    validate: (data) => {
        let errors = {};
      
        if (!data.name) {
          errors.name = 'Coupon name is required.';
        }
        
        if (!data.code) {
          errors.code = 'Coupon code is required.';
        }
      
        if (!data.expire) {
          errors.expire = 'Expire Date is required.';
        }
        if (!data.disPercent) {
          errors.disPercent = 'discount Percentage is required.';
        }
      
        return errors;
      },
      
    onSubmit: (data) => {
        console.log(data,43);
        addCoupon(data)
      
      formik.resetForm();
    }
  });

  const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) || (formik.touched[name] && !formik.values[name]) ? (
      <small className="p-error d-block">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  

    return (
        <div className=" col-md-10 col-sm-9">
            <button className="btn btn-primary my-3" onClick={() => setVisible(true)} >add Coupon</button>
        <div className="card">
           <DataTable value={nodes} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" style={{ width: '25%' }}></Column>
                <Column field="code" header="Code" style={{ width: '25%' }}></Column>
                <Column field="expire" header="Expire" style={{ width: '25%' }}></Column>
                <Column field="disPercent" header="Discount (percentage)" style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
        <Dialog header="Add Coupon" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <div className="card flex justify-content-center mt-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
  <Toast ref={toast} />

  <span className="p-float-label py-2 d-block">
    <InputText
      id="name"
      name="name"
      value={formik.values.name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={classNames({ 'p-invalid w-100': isFormFieldInvalid('name') }, 'w-100')}
    />
    <label
      htmlFor="name"
      className={classNames({ 'p-error': isFormFieldInvalid('name') })}
    >
      Coupon Name
    </label>
  </span>
  {getFormErrorMessage('name')}

  <span className="p-float-label py-2 d-block">
    <InputText
      id="code"
      name="code"
      value={formik.values.code}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={classNames({ 'p-invalid w-100': isFormFieldInvalid('code') }, 'w-100')}
    />
    <label
      htmlFor="code"
      className={classNames({ 'p-error': isFormFieldInvalid('code') })}
    >
      Coupon Code
    </label>
  </span>
  {getFormErrorMessage('code')}
  <span className="p-float-label py-2 d-block">
            <Calendar
  name="expire"
  id='expire'
  onBlur={formik.handleBlur}
  onChange={formik.handleChange}
  className={classNames({ 'p-invalid w-100': isFormFieldInvalid('expire') }, 'w-100')}
  value={formik.values.expire} // Use formik.values.expire instead of formik.values.code
  dateFormat="dd/mm/yy"
/>
    <label
      htmlFor="expire"
      className={classNames({ 'p-error': isFormFieldInvalid('expire') })}
      >
      Expire Date
    </label>
    </span>
        {getFormErrorMessage('expire')}

        <span className="p-float-label py-2 d-block">
      
        <InputNumber
  id="disPercent"
  name="disPercent"
  onBlur={formik.handleBlur}
  value={formik.values.disPercent}
  className={classNames({ 'p-invalid w-100': isFormFieldInvalid('disPercent') }, 'w-100')}
  onChange={(e) => {
   
    const event = {
      target: {
        name: 'disPercent',
        value: e.value,
      },
    };
    e.value < 100 &&  e.value > 0  && formik.handleChange(event);
    
  }}
  prefix="%"
  maxLength={2}
  maxvalue={100}
  max={100}
/>

    <label
      htmlFor="disPercent"
      className={classNames({ 'p-error': isFormFieldInvalid('disPercent') })}
      >
      Discount Percentage
    </label>
        </span>
        {getFormErrorMessage('disPercent')}

  <Button type="submit" label="Submit" />
  

</form>

        </div>
            </Dialog>
        </div>
    )
}
        