
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CellTowerIcon from "@mui/icons-material/CellTower";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector } from "react-redux";
export const SlideBarListItems = () => {
    const user = useSelector((state) => state.user.currentUser);
    const userType = user.userrole;
    console.log(userType)
    let listItems = [];
    if (userType === "Admin") {
        listItems = [
            {
                id: "leftbar-listItem-3",
                listName: "Dashboard",
                icon: <BookmarksIcon />,
                link: "/admin/dashboard",
            },
            {
                id: "leftbar-listItem-1",
                listName: "Manage Users",
                icon: <BookmarksIcon />,
                link: "/admin/manage-users",
            },
            {
                id: "leftbar-listItem-2",
                listName: "Create Users",
                icon: <BookmarksIcon />,
                hasExpand: true,
                expand: [
                    {
                        id: "leftbar-listItem-2-1",
                        listName: "Create Farmer",
                        link: "/admin/create-user/Farmer",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    },
                    {
                        id: "leftbar-listItem-2-2",
                        listName: "Create Buyer",
                        link: "/admin/create-user/Buyer",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    }
                    ,
                    {
                        id: "leftbar-listItem-2-3",
                        listName: "Create Charity",
                        link: "/admin/create-user/Charity",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    }
                    ,
                    {
                        id: "leftbar-listItem-2-4",
                        listName: "Create Advertiser",
                        link: "/admin/create-user/Advertiser",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    },
                    {
                        id: "leftbar-listItem-2-5",
                        listName: "Create Moderator",
                        link: "/admin/create-user/Moderator",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    },
                    {
                        id: "leftbar-listItem-2-5",
                        listName: "Create Argi Expert",
                        link: "/admin/create-user/AgriExpert",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    }
                ]
            },

        ];
    } else if (userType === "Moderator") {
        listItems = [
            {
                id: "leftbar-listItem-1",
                listName: "Dashboard",
                icon: <BookmarksIcon />,
                link: "/moderator/dashboard",
            },
            {
                id: "leftbar-listItem-2",
                listName: "Articals",
                icon: <BookmarksIcon />,
                link: "/moderator/articals",
            },
            {
                id: "leftbar-listItem-3",
                listName: "My Profile",
                icon: <BookmarksIcon />,
                link: "/moderator/profile",
            },
            
        ];
    } else if (userType === "Farmer") {
        listItems = [
            {
                id: "leftbar-listItem-1",
                listName: "Bank Account",
                icon: <PeopleAltIcon />,
                link: "/sell/add-bankAccount"
            },
            {
                id: "leftbar-listItem-2",
                listName: "Add Product",
                icon: <BookmarksIcon />,
                hasExpand: true,
                expand: [
                    {
                        id: "leftbar-listItem-2-1",
                        listName: "Add to Sale",
                        link: "/sell/add-sell-product",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    },
                    {
                        id: "leftbar-listItem-2-2",
                        listName: "Add to donate",
                        link: "/donate/add-donate-product",
                        icon: <BookmarksIcon />,
                        hasExpand: false,
                    }
                ]
            },
            {
                id: "leftbar-listItem-3",
                listName: "Pending",
                icon: <BookmarksIcon />,
                link: "/sell/pending",
            },
            {
                id: "leftbar-listItem-4",
                listName: "My Account",
                icon: <PeopleAltIcon />,
                link: "/farmer/profile"
            },
            {
                id: "leftbar-listItem-5",
                listName: "Articals",
                icon: <CastForEducationIcon />,
                link: "/articals"
            },
        ];
    } else if (userType === "Buyer") {
        listItems = [
            {
                id: "leftbar-listItem-1",
                listName: "Buy Details",
                icon: <BookmarksIcon />,
                link: "/buyer/buy-details",
            },
            {
                id: "leftbar-listItem-2",
                listName: "My Account",
                icon: <PeopleAltIcon />,
                link: "/buyer/profile"
            },
        ];
    }

    return listItems;
}