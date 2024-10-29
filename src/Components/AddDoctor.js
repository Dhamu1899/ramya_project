import React, { useState, useEffect } from 'react';
import './AddDoctor.css';

const AddDoctor = () => {
    const [doctor, setDoctor] = useState({
        id: '',
        name: '',
        qualification: '',
        experience: '',
        specialty: '',
        location: ''
    });
    const [doctorsList, setDoctorsList] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [searchLocation, setSearchLocation] = useState('');
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        const savedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
        setDoctorsList(savedDoctors);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (doctor.name && doctor.qualification && doctor.experience && doctor.specialty && doctor.location) {
            const updatedDoctors = editMode
                ? doctorsList.map((doc) => (doc.id === doctor.id ? doctor : doc))
                : [...doctorsList, { ...doctor, id: Date.now().toString() }];

            setDoctorsList(updatedDoctors);
            localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
            resetForm();
            setEditMode(false);
            setShowForm(false);
        } else {
            alert('Please fill in all fields');
        }
    };

    const resetForm = () => {
        setDoctor({
            id: '',
            name: '',
            qualification: '',
            experience: '',
            specialty: '',
            location: ''
        });
    };

    const handleEdit = (id) => {
        const doctorToEdit = doctorsList.find((doc) => doc.id === id);
        setDoctor(doctorToEdit);
        setEditMode(true);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            const updatedDoctors = doctorsList.filter((doc) => doc.id !== id);
            setDoctorsList(updatedDoctors);
            localStorage.setItem('doctors', JSON.stringify(updatedDoctors));
        }
    };

    const filteredDoctors = doctorsList.filter((doc) =>
        doc.location.toLowerCase().includes(searchLocation.toLowerCase())
    );

    return (
        <div className='add-doctor-container'>
            <div className='doctor-list-container'>
                <h2>Doctors List</h2>
                <input
                    type='text'
                    placeholder='Search by location'
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className='search-input'
                />
                <table className='doctor-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Qualification</th>
                            <th>Experience</th>
                            <th>Specialty</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length === 0 ? (
                            <tr>
                                <td colSpan='6'>No doctors found.</td>
                            </tr>
                        ) : (
                            filteredDoctors.map((doc) => (
                                <tr key={doc.id}>
                                    <td>{doc.name}</td>
                                    <td>{doc.qualification}</td>
                                    <td>{doc.experience}</td>
                                    <td>{doc.specialty}</td>
                                    <td>{doc.location}</td>
                                    <td>
                                        <button className='edit-button' onClick={() => handleEdit(doc.id)}>
                                            Edit
                                        </button>
                                        <button className='delete-button' onClick={() => handleDelete(doc.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <button className='toggle-form-button' onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add Doctor'}
                </button>
            </div>
            {showForm && (
                <div className='doctor-form-container'>
                    <h2>{editMode ? 'Edit Doctor Information' : 'Add Doctor Information'}</h2>
                    <form onSubmit={handleSubmit} className='doctor-form'>
                        <label>Doctor Name:</label>
                        <input type='text' name='name' value={doctor.name} onChange={handleChange} />

                        <label>Qualification:</label>
                        <input type='text' name='qualification' value={doctor.qualification} onChange={handleChange} />

                        <label>Years Of Experience:</label>
                        <input type='text' name='experience' value={doctor.experience} onChange={handleChange} />

                        <label>Specialty:</label>
                        <input type='text' name='specialty' value={doctor.specialty} onChange={handleChange} />

                        <label>Location:</label>
                        <input type='text' name='location' value={doctor.location} onChange={handleChange} />

                        <button type='submit' className='submit-button'>
                            {editMode ? 'Update Doctor' : 'Add Doctor'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddDoctor;
