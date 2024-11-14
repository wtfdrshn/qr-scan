import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Modal from 'react-modal';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleScan = (data) => {
    if (data) {
      try {
        const decodedData = JSON.parse(data);

        // Check if decoded data has a valid structure
        if (decodedData && decodedData.isValid !== undefined) {
          setIsValid(decodedData.isValid);
          setModalIsOpen(true);
        } else {
          console.error("QR code data is invalid or improperly formatted.");
        }
      } catch (error) {
        console.error("Error decoding QR data:", error);
      }
    }
  };

  const handleError = (error) => {
    console.error("QR Code scan error:", error);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <h2>QR Code Scanner</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleScan} // Use onResult instead of onScan
        style={{ width: '100%' }}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ticket Status"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h3>{isValid ? "Ticket Valid" : "Ticket Not Valid"}</h3>
        <p>
          {isValid
            ? "Your ticket is valid. Enjoy the event!"
            : "This ticket is not valid. Please contact support."}
        </p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App