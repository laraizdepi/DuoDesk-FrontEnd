import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/actions/authActions';

const DashboardNavBar = () => {
    const [mobile, setMobile] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
		dispatch(loginUser(true))
		if (window.innerWidth <= 800) {
			setMobile(true)
		}
		const handleResize = () => {
			if (window.innerWidth <= 800) setMobile(true)
			else setMobile(false)
		}
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

    return (
        <div>
            
        </div>
    )
}

export default DashboardNavBar
