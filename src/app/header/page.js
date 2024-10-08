import AddBlog from "../addblog/page";

const Header = () => {
  return (
    <div className="flex justify-between px-10 items-center shadow-lg bg-slate-200 py-5 text-xl">
      <div className="flex justify-center items-center gap-10">
        <div>
          <a href="/">
            <img src="/assets/logo.png" className="w-28 h-16" alt="Logo" />
          </a>
        </div>

        <div>
          <a href="/addblog">Add Blog</a>
        </div>
        <div>
          <a href="/addcategory">Add Category</a>
        </div>
      </div>
      <div>
        <a
          href="/login"
          className="bg-slate-300/25 text-black px-5 mt-5 py-2 rounded-md"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Header;
