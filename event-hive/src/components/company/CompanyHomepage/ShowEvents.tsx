import React, { useEffect } from 'react'
import { getEvent } from '../../../api/companyApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

function ShowEvents() {
    const {companyInfo} = useSelector((state:RootState)=>state.auth)
    useEffect(()=>{
        const fetchData = async () =>{
            const res = await getEvent(companyInfo.company_email)
            console.log(res?.data.data)
        }
        fetchData()
    },[])
  return (

    <div className='border relative pl-3 w-full h-10 bg-white'>

    </div>
  )
}

export default ShowEvents