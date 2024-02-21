import Link from "next/link";
import Image from "next/image";
import whatsapp_logo from "../../../public/whatsapp_logo.png";

export default function WhatsApp() {
   return (
      <Link href="https://api.whatsapp.com/send/?phone=5492214942853" target="_blank">
         <Image
            className='fixed bottom-5 right-5 hover:scale-125 max-xl: scale-75 max-xl:hover:scale-90'
            src={whatsapp_logo}
            alt="whatsapp_logo"
            width={100}
            height={100}
         />
      </Link>
   )
}