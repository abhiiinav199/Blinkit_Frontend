import UsersMenu from "../components/UsersMenu";
import { IoClose } from "react-icons/io5";

const UserMenuMobile = () => {
  return (
    <section className="min-h-[78vh] py-2">
      <div className="bg-white shadow-md container mx-auto p-3">
        <button
          onClick={() => window.history.back()}
          className="text-neutral-800 block w-fit ml-auto cursor-pointer"
        >
          <IoClose size={24} />
        </button>
        <div className="container mx-auto px-3 py-5">
          <UsersMenu />
        </div>
      </div>
    </section>
  );
};

export default UserMenuMobile;
