import {
    useEffect,
    useState,
} from "react";


import toast from "react-hot-toast";


import AdminSidebar from "../../components/admin/AdminSidebar";


import {
    getUsers,
    deleteUser,
    changeUserRole,
} from "../../services/adminUserService";


import type {
    User,
} from "../../types/user";



const ManageUsers = () => {


    const [users,setUsers] =
        useState<User[]>([]);



    const [loading,setLoading] =
        useState(true);



    const [search,setSearch] =
        useState("");



    const [page,setPage] =
        useState(0);



    const [size,setSize] =
        useState(10);



    const [totalPages,setTotalPages] =
        useState(0);



    const loadUsers = async()=>{


        try{


            setLoading(true);


            const response =
                await getUsers(
                    page,
                    size,
                    search
                );



            setUsers(
                response.content
            );


            setTotalPages(
                response.totalPages
            );


        }catch{


            toast.error(
                "Failed to load users."
            );


        }finally{


            setLoading(false);


        }


    };





    useEffect(()=>{


        loadUsers();


    },[
        page,
        size,
        search
    ]);







    const handleDelete = async(
        id:number
    )=>{


        const confirmDelete =
            window.confirm(
                "Delete this user?"
            );


        if(!confirmDelete)
            return;



        try{


            await deleteUser(id);



            toast.success(
                "User deleted."
            );


            loadUsers();



        }catch{


            toast.error(
                "Delete failed."
            );


        }


    };







    const handleRoleChange = async(

        id:number,

        role:"USER"|"ADMIN"

    )=>{


        try{


            await changeUserRole(
                id,
                role
            );



            toast.success(
                "Role updated."
            );



            loadUsers();



        }catch{


            toast.error(
                "Role update failed."
            );


        }


    };







    return (

        <div
            className="
            min-h-screen
            bg-[#121212]
            text-white
            "
        >


            <div className="flex">


                <AdminSidebar />



                <main className="flex-1 p-10">


                    <h1
                        className="
                        mb-8
                        text-4xl
                        font-bold
                        "
                    >
                        Manage Users
                    </h1>





                    <div
                        className="
                        mb-6
                        flex
                        gap-4
                        "
                    >


                        <input

                            value={search}

                            onChange={(e)=>{

                                setPage(0);

                                setSearch(
                                    e.target.value
                                );

                            }}

                            placeholder="Search user..."

                            className="
                            flex-1
                            rounded-xl
                            border
                            border-gray-700
                            bg-[#181818]
                            p-3
                            "
                        />




                        <select

                            value={size}

                            onChange={(e)=>{

                                setPage(0);

                                setSize(
                                    Number(
                                        e.target.value)
                                );

                            }}

                            className="
                            rounded-xl
                            bg-[#181818]
                            border
                            border-gray-700
                            px-4
                            "
                        >

                            <option value={10}>
                                10
                            </option>


                            <option value={20}>
                                20
                            </option>


                            <option value={50}>
                                50
                            </option>


                            <option value={100}>
                                100
                            </option>


                        </select>


                    </div>







                    {
                        loading

                            ?

                            <p>
                                Loading...
                            </p>


                            :


                            <div
                                className="
                            overflow-hidden
                            rounded-2xl
                            bg-[#181818]
                            "
                            >


                                <table className="w-full">


                                    <thead
                                        className="
                                    border-b
                                    border-gray-700
                                    "
                                    >

                                    <tr>

                                        <th className="p-4 text-left">
                                            Username
                                        </th>


                                        <th className="p-4 text-left">
                                            Email
                                        </th>


                                        <th className="p-4 text-left">
                                            Role
                                        </th>


                                        <th className="p-4 text-left">
                                            Actions
                                        </th>


                                    </tr>


                                    </thead>






                                    <tbody>


                                    {
                                        users.map(user=>(


                                            <tr

                                                key={user.id}

                                                className="
                                            border-b
                                            border-gray-800
                                            "

                                            >


                                                <td className="p-4">

                                                    {user.username}

                                                </td>




                                                <td className="p-4">

                                                    {user.email}

                                                </td>





                                                <td className="p-4">


                                                    <select

                                                        value={
                                                            user.role
                                                        }

                                                        onChange={(e)=>

                                                            handleRoleChange(

                                                                user.id,

                                                                e.target.value as
                                                                    "USER"|"ADMIN"

                                                            )
                                                        }

                                                        className="
                                                    rounded-lg
                                                    bg-[#121212]
                                                    p-2
                                                    "

                                                    >

                                                        <option value="USER">
                                                            USER
                                                        </option>


                                                        <option value="ADMIN">
                                                            ADMIN
                                                        </option>


                                                    </select>


                                                </td>







                                                <td className="p-4">


                                                    <button

                                                        onClick={()=>
                                                            handleDelete(
                                                                user.id
                                                            )
                                                        }

                                                        className="
                                                    rounded-lg
                                                    bg-red-600
                                                    px-4
                                                    py-2
                                                    hover:bg-red-700
                                                    "

                                                    >

                                                        Delete

                                                    </button>


                                                </td>



                                            </tr>


                                        ))
                                    }


                                    </tbody>


                                </table>



                            </div>


                    }







                    <div
                        className="
                        mt-6
                        flex
                        justify-center
                        gap-3
                        "
                    >


                        <button

                            disabled={page===0}

                            onClick={()=>
                                setPage(
                                    page-1
                                )
                            }

                            className="
                            rounded-lg
                            bg-[#181818]
                            px-4
                            py-2
                            disabled:opacity-50
                            "

                        >

                            Previous

                        </button>




                        <span className="px-4 py-2">

                            Page {page+1} / {totalPages}

                        </span>





                        <button

                            disabled={
                                page+1 >= totalPages
                            }

                            onClick={()=>
                                setPage(
                                    page+1
                                )
                            }

                            className="
                            rounded-lg
                            bg-[#181818]
                            px-4
                            py-2
                            disabled:opacity-50
                            "

                        >

                            Next

                        </button>


                    </div>




                </main>


            </div>


        </div>

    );

};


export default ManageUsers;