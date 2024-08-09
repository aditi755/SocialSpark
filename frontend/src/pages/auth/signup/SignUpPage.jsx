import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../../components/svgs/X";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

	const {isError, mutate, isPending, error } = useMutation({
		mutationFn: async ({email, username, fullName, password}) => {
			try{
				//https://twitter-clone-liard-three.vercel.app/api/auth/me
				const res = await fetch("/auth/signup", {  //login the route, /api/api -> 1-> port be 2 => api/auth  -> http:localhost:5000/api/auth/signup  consolelog it 
					method: "POST", 
					headers: {
						"Content-Type" : "application/json"
					}, 
					body: JSON.stringify({email, username, fullName, password})
				});

		    // Clone the response to log its text
			const clonedResponse = res.clone();
			const text = await clonedResponse.text();
			console.log("Server response:", text);
	  
			// Check if the response status is not ok
			if (!res.ok) {
			  throw new Error(text || "Something went wrong");
			}
	  
			// Try to parse the original response as JSON
			const data = await res.json();
	  
			if (data.error) throw new Error(data.error);
	  
			return data;
				
				
				//  // Log the raw response to see what's coming back
				// const text = await res.text();
				// console.log("Server response:", text);
				// const data = await res.json();
				
				// if(!res.ok) throw new Error(data.error || "something went wrong");
				
				// if(data.error) throw new Error(data.error);
				
				// return data;
            } catch(error){
               console.error(error);
			  throw error;
			}
		},
		onSuccess: () => {
			toast.success("account created successfully");
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();  //page won't reload
		console.log(formData);
		mutate(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
				<XSvg className=' lg:w-2/3 fill-white' />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
					<XSvg className='w-24 lg:hidden fill-white' />
					<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='Username'
								name='username'
								onChange={handleInputChange}
								value={formData.username}
							/>
						</label>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>Sign up</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg'>Already have an account?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;
