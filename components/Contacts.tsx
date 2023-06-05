import { Text, Button } from '@vercel/examples-ui';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ellipsizeAddress } from '../utils/SolanaFunctions';
import { Cookies, useCookies } from 'react-cookie';
import { useEffect } from 'react';
import React from 'react';
import { Tooltip } from 'react-tooltip'
import 'react-popper-tooltip/dist/styles.css';


// quiero hacer que estos botones despliguen un tooltip que digan que pronto estaran disponibles


const ContactManager = () => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="px-4 py-2 text-md font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500  w-full text-left rounded-lg hover:animate-spin-slow duration-1000 ease-in-out focus:outline-none mb-4"
        id="administrarContactos"
        data-tooltip-content="Próximamente"
        data-tooltip-id="tooltip-administrarContactos"
      >
        Administrar contactos
      </button>
      <Tooltip id="tooltip-administrarContactos" />

      <button
        className="px-4 py-2 text-md font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg w-full text-left hover:animate-spin-slow focus:outline-none"
        id="crearContacto"
        data-tooltip-content="Próximamente"
        data-tooltip-id="tooltip-crearContacto"
      >
        Añadir contacto
      </button>
      <Tooltip id="tooltip-crearContacto" />
    </div>
  );
}


type Contact = {
  id: number;
  name: string;
  publicKey: string;
};

const contacts: Contact[] = [
  { id: 1, name: 'Armando Terrazas', publicKey: 'E4UoG4a7PuLYmMkFUVamdBpmzSCoUtVicjFNj5Yuk39K' },
  { id: 2, name: 'Daniel Muñoz', publicKey: '8AV8uxP1Y8EqmDmc6eciyVhxHS4tkWWmCw7UQekooGqQ' },
  { id: 3, name: 'Inés García', publicKey: 'Anwyc1s94Fs7hPEm6ohuYuFXN8BMsXJZRjExHziQN1sj' },
  // Add more contacts as needed
];

function Contacts() {
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [myPublicKey, setMyPublicKey] = useState<string>("");
  const [cookies] = useCookies(['walletAddress']);

  useEffect(() => {
    setMyPublicKey(cookies.walletAddress);
  }, [cookies]);

  const copyToClipboard = (publicKey: string) => {
    navigator.clipboard.writeText(publicKey);
    setCopiedContact(publicKey);
    setTimeout(() => {
      setCopiedContact(null);
    }, 3000);
  };

  const handleManageContacts = () => {
    console.log('Managing all contacts');
  };

  const handleCreateContact = () => {
    console.log('Creating a new contact');
  };

  return (
    <div className="flex flex-col py-4 px-2 w-full h-full items-center">
      <div className="flex justify-between items-center mb-4">
        <Text variant="h2" className="text-white">
          Contactos
        </Text>
      </div>
      <ul className="list-none flex-grow overflow-auto">
        {contacts.map((contact) => (
          <li key={contact.id} className="py-2 flex w-full">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-gray-200 mr-2" />
              <button
                className="px-4 py-1 text-gray-200 rounded w-full text-left hover:bg-slate-400 hover:text-slate-900 focus:outline-none"
                onClick={() => copyToClipboard(contact.publicKey)}
              >
                {contact.name}
              </button>
            </div>
            {copiedContact === contact.publicKey && (
              <span className="text-green-500 ml-2">¡Copiado!</span>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col w-full items-center">
        <div className="flex-grow" /> {/* Spacer to push the buttons to the bottom */}
        <div className="flex flex-col justify-center w-full items-center">
          <ContactManager />
        </div>
        <div className="flex flex-col items-center mt-4">

          <div className="flex items-center mt-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-200 mr-2" />
            <button
              className="px-4 py-1 text-gray-200 rounded w-full text-left hover:bg-slate-400 hover:text-slate-900 focus:outline-none"
              onClick={() => copyToClipboard(myPublicKey)}
            >
              {ellipsizeAddress(myPublicKey)}
            </button>
            {copiedContact === myPublicKey && (
              <span className="text-green-500 ml-2">¡Copiado!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
