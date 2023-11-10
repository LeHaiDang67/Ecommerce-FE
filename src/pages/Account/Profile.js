import { useEffect, useState } from "react";
import { UserAuth } from "../../contexts/AuthConext";
const Profile = (props) => {
    const { user } = UserAuth();
    const [userProfile, setUserProfile] = useState({
        displayName: "",
        phoneNumber: "",
        address: "",
        email: "",
        photo: "",
    });
    const onChange = (event) => {
        const target = event.target;
        setUserProfile({ ...userProfile, [target.name]: target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        if (user !== null || user !== undefined) {
            let userData = {
                displayName: user?.displayName,
                email: user?.email,
                photo: user?.photoURL
            }
            setUserProfile({ ...userProfile, ...userData })
        }

    }, [user]);
    return (
        <div className="flex justify-center px-4 m-10">
            <div className="w-1/3">
                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                    Your account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="text-center box-avatar mt-20">
                        <div className="avatar-img">
                            {userProfile.photo
                                ? <span className="border-img"> <img
                                    src={userProfile.photo}
                                    alt="paul"
                                    width="100px"
                                    className="avatar-circle"
                                /></span>
                                : <span className="icon-user icon-user-avatar"><i className="fa fa-user-circle-o" aria-hidden="true" /></span>
                            }
                        </div>
                    </div>
                    <div className="group-item">
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="displayName">Display name:</label>
                        <input type="text" name="displayName" value={userProfile?.displayName} onChange={onChange}
                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                        />
                    </div>
                    <div className="group-item">
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="email">Email:</label>
                        <input type="text" name="email" value={userProfile?.email} onChange={onChange}
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
                        <label className="block font-titleFont text-base font-semibold text-gray-600 mr-3" htmlFor="address">Address:</label>
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