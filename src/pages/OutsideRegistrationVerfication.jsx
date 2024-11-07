import React, { useState, useEffect } from 'react';
import ProtectedHeader from '../components/Header';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, Checkbox, TextField } from '@mui/material';

export default function OutsideRegistrationVerification() {
  const [registrationId, setRegistrationId] = useState('');
  const [registrationData, setRegistrationData] = useState(null);
  const [planRegistrationData, setPlanRegistrationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [roomAllotted, setRoomAllotted] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [attendeeFormData, setAttendeeFormData] = useState({});

  // Function to fetch plan registration data
  const fetchPlanRegistrations = async (registrationId) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(`https://api.sinusoid.in/planRegistration/${registrationId}`);
      const data = response.data; // Store response.data in a new variable

      console.log("API Response:", data);

      if (data) {
        setPlanRegistrationData(data); // Set plan registration data
        setRegistrationData(data); // Set fetched data for display
        setShowForm(false); // Hide the form on successful fetch
        updateAttendeeFormData(data); // Populate attendee form data
      } else {
        alert("No registration found for this ID.");
      }
    } catch (error) {
      console.error("Error fetching plan registrations:", error);
      alert("Failed to fetch registration data.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Update the attendee form data
  const updateAttendeeFormData = (data) => {
    setAttendeeFormData((prev) => ({
      ...prev,
      attendeeId: data.registrationId,
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.email,
      contactNumber: data.phone,
    }));
  };

  // Handle registration ID submission
  const handleSubmit = async () => {
    if (!registrationId.trim()) {
      alert("Please enter a valid registration ID.");
      return;
    }

    // Make sure the checklist is complete
    if (!isSubmitEnabled) {
      alert("Please complete the checklist.");
      return;
    }

    // Prepare the data for the POST request
    const dataToSubmit = {
      ...attendeeFormData, // Attendee details from form
      roomAllotted: roomAllotted, // Room allotted field
      emergencyContact: emergencyContact, // Emergency contact field
      checkedItems: checkedItems, // Checklist details
    };

    try {
      setLoading(true);
      // Send the POST request to your API
      const response = await axios.post('https://api.sinusoid.in/attendee/external', dataToSubmit);

      console.log('API Response:', response.data);
      alert('Checklist submitted successfully!');

      // Reset form data after submission
      setRegistrationId('');
      setRegistrationData(null);
      setShowForm(true);
      setCheckedItems({});
      setRoomAllotted('');
      setEmergencyContact('');
      setAttendeeFormData({});
    } catch (error) {
      console.error('Error submitting checklist:', error);
      alert('Failed to submit the checklist.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for registration ID
  const handleInputChange = (event) => {
    setRegistrationId(event.target.value);
    console.log(event.target.value);
  };

  // Handle image click for preview
  const handleImageClick = (imageUrl) => {
    setCurrentImage(imageUrl);
    setDialogOpen(true);
  };

  // Close image preview dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  // Handle resetting the form to check another registration ID
  const handleCheckAnother = () => {
    setRegistrationId('');
    setRegistrationData(null);
    setShowForm(true);
    setCheckedItems({});
    setRoomAllotted('');
    setEmergencyContact('');
  };

  // Handle checkbox changes
  const handleCheckboxChange = (field) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [field]: !prevCheckedItems[field],
    }));
  };

  // Check if all required fields are completed for submitting
  const isSubmitEnabled = Object.values(checkedItems).every(Boolean) && roomAllotted && emergencyContact;

  if (loading) {
    return (
      <>
        <ProtectedHeader />
        <div className="flex items-center justify-center h-screen">
          <p className="text-white">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ProtectedHeader />
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-900">
        {showForm ? (
          <>
            <input
              type="text"
              placeholder="Enter the registration ID"
              value={registrationId}
              onChange={handleInputChange}
              className="p-3 border border-gray-600 rounded-md text-center w-72 bg-gray-800 text-white placeholder-gray-400"
            />
            <button
              onClick={() => fetchPlanRegistrations(registrationId.trim())}
              className="w-36 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </>
        ) : (
          <div className="mt-6 p-4 bg-gray-800 rounded-md text-white w-80">
            <h3 className="text-xl mb-2">Registration Details</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <span><strong>Name:</strong> {registrationData.firstName} {registrationData.lastName}</span>
                <Checkbox
                  checked={checkedItems.name || false}
                  onChange={() => handleCheckboxChange('name')}
                  color="primary"
                />
              </div>
              <div className="flex items-center">
                <span><strong>Email:</strong> {registrationData.email}</span>
                <Checkbox
                  checked={checkedItems.email || false}
                  onChange={() => handleCheckboxChange('email')}
                  color="primary"
                />
              </div>
              <div className="flex items-center">
                <span><strong>University:</strong> {registrationData.universityName}</span>
                <Checkbox
                  checked={checkedItems.universityName || false}
                  onChange={() => handleCheckboxChange('universityName')}
                  color="primary"
                />
              </div>
              <div className="flex items-center">
                <span><strong>Plan:</strong> {registrationData.planName}</span>
                <Checkbox
                  checked={checkedItems.planName || false}
                  onChange={() => handleCheckboxChange('planName')}
                  color="primary"
                />
              </div>
              <div className="flex items-center">
                <span><strong>Phone:</strong> {registrationData.phone}</span>
                <Checkbox
                  checked={checkedItems.phone || false}
                  onChange={() => handleCheckboxChange('phone')}
                  color="primary"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <button
                  onClick={() => handleImageClick(registrationData.photoIdUrl)}
                  className="text-blue-400 underline"
                >
                  ID-PROOF
                </button>
                <Checkbox
                  checked={checkedItems.photoIdUrl || false}
                  onChange={() => handleCheckboxChange('photoIdUrl')}
                  color="primary"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleImageClick(registrationData.paymentProofUrl)}
                  className="text-blue-400 underline"
                >
                  PAYMENT-PROOF
                </button>
                <Checkbox
                  checked={checkedItems.paymentProofUrl || false}
                  onChange={() => handleCheckboxChange('paymentProofUrl')}
                  color="primary"
                />
              </div>
            </div>
            <TextField
              label="Enter the room allotted"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roomAllotted}
              onChange={(e) => setRoomAllotted(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#a9a9a9', color: 'black' }
              }}
            />
            <TextField
              label="Emergency contact number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#a9a9a9', color: 'black' }
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!isSubmitEnabled}
              className={`mt-4 w-full p-2 rounded-md transition-colors ${
                isSubmitEnabled ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-500 text-gray-300'
              }`}
            >
              Submit Checklist
            </button>
            <button
              onClick={handleCheckAnother}
              className="mt-4 w-full p-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              Check Another Registration ID
            </button>
          </div>
        )}
      </div>

      {/* Dialog for image preview */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img src={currentImage} alt="Preview" className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </>
  );
}
