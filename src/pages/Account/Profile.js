import { useState } from "react";
const Profile = (props) => {
    const { userProfile, setUserProfile } = useState({
        firstname: "",
        lastname: "",
        phoneNumber: "",
        address: "",

    });
    const onChange = (event) => {
        const target = event.target;
        setUserProfile({ ...Profile, [target.name]: target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return (
        <div className="flex justify-center w-full px-4 m-10">
            <div className="w-1/3">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                    Your account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="group-item">
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="firstname">First name:</label>
                        <input type="text" name="firstname" value={userProfile?.firstname} onChange={onChange}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        />
                    </div>
                    <div className="group-item">
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="lastname">Last name:</label>
                        <input type="text" name="lastname" value={userProfile?.lastname} onChange={onChange}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        />
                    </div>
                    <div className="group-item">
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="phoneNumber">Phone number:</label>
                        <input type="number" min="0" name="phoneNumber" value={userProfile?.phoneNumber} onChange={onChange}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        />
                    </div>
                    <div className="group-item">
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="phoneNumber">Address:</label>
                        <input type="text" name="address" value={userProfile?.address} onChange={onChange}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        />
                    </div>
                    <button className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-40 text-base font-medium h-10 rounded-md  duration-300 btn-sign-in">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;