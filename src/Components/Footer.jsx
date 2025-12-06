
import { BsTwitterX } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-black text-neutral-content p-10">
  <aside>
    <Link to={"/"} ><p className='bg-linear-to-r from-teal-700 to-teal-500 text-transparent bg-clip-text text-2xl lg:text-3xl font-bold'>CityFix</p></Link>
    <p className='text-teal-600 font-semibold'>
      <span>“Report and manage public infrastructure issues with ease using <br /> our user-friendly platform designed for citizens and authorities alike.”</span>
      
      <br />
      <span className='flex gap-1 items-center mb-5'><MdEmail /><span className='font-semibold'>Contact us</span>-  cityfix@gmail.com</span>
      Copyright © {new Date().getFullYear()} - All right reserved by CityFix Industries Ltd
    </p>
  </aside>
  <nav>
    <h6 className="footer-title text-black">Social</h6>
    <div className="grid grid-flow-col gap-4">
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current hover:scale-110 text-teal-600 transition ease-in-out hover:text-blue-500">
          <BsTwitterX size={25} />
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current hover:scale-110 text-teal-600 transition ease-in-out hover:text-red-500">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current hover:scale-110 text-teal-600 transition ease-in-out hover:text-blue-700">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
    </div>
  </nav>
</footer>
    );
};

export default Footer;