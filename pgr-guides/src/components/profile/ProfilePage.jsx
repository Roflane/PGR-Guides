import {useDispatch, useSelector} from "react-redux";
import {selectImagePath, selectUser} from "../../store/selectors/authSelectors.js";
import {useEffect, useState} from "react";
import ProfileApi from "../../api/ProfileApi.js";
import {API_BASE} from "../../configs/ApiConfig.js";
import {updateAvatar} from "../../store/authSlice.jsx";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const imagePath = useSelector(selectImagePath);
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await ProfileApi.getAll();

                if (Array.isArray(response)) {
                    setImages(response);
                }
                else {
                    console.error("Unexpected response format:", response);
                    setImages([]);
                }
            } catch (error) {
                console.error("Error while loading images:", error);
                setImages([]);
            }
        };

        console.log(user);
        if (isOpen) {
            fetchImages().then();
        }
    }, [isOpen]);

    const handleClose = () => { setIsOpen(false); };

    const handleAvatarChange = (img) => {
        console.log("Selected image:", img);
        console.log("API_BASE:", API_BASE);

        const avatarPath = img.split(API_BASE)[1];
        console.log("Extracted path:", avatarPath);

        ProfileApi.changeProfileImage(user.id, avatarPath)
            .then(response => {
                console.log("API response:", response);
            })
            .catch(error => {
                console.error("Error changing avatar:", error);
            });

        dispatch(updateAvatar({ imagePath: img }));
    }

    return (
        <div className="flex flex-col items-center mt-16 ml-8">
            <div className="relative inline-block">
                <img
                    className="w-32 h-32 rounded-full border-4 border-red-500"
                    src={imagePath}
                    alt=""
                />

                <button
                    className="absolute w-8 h-8 rounded-full bg-blue-500 -right-1 -top-1 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="fas fa-pen text-sm"></i>
                </button>
            </div>

            <a className="font-bold text-black text-4xl mt-4">{user.login}</a>
            <a className="mt-8">Register date | {user.registerDate}</a>
            {/*<a className="mt-8">Roles | {user.roles}</a>*/}

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                >
                    <div
                        className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl text-black font-bold">Avatar</h2>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times text-2xl"></i>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-4">
                                {images.map((img, index) => (
                                    <div
                                        key={index}
                                        className="rounded-lg overflow-hidden border-2 border-black hover:border-blue-500 cursor-pointer transition-all"
                                        onClick={() => handleAvatarChange(img)}
                                    >
                                        <img
                                            src={img}
                                            alt={`Avatar ${index + 1}`}
                                            className="w-32 h-32"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;