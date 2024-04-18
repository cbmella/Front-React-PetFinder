import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface Pet {
    id: number;
    name: string;
    description: string;
    location: string;
    photo_url: string;
    status: string;
    breed?: string;
    age?: number;
    personality?: string;
    adoption_requirements?: string;
}

interface PetModalProps {
    petId: number | null;
    onClose: () => void;
}

const PetModal: React.FC<PetModalProps> = ({ petId, onClose }) => {
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const handleEditClick = () => {
        navigate(`/pets/${petId}/edit`);
    };

    useEffect(() => {
        const fetchPet = async () => {
            if (petId) {
                try {
                    const response = await axios.get(`${API_BASE_URL}/pets/${petId}`);
                    setPet(response.data);
                    setLoading(false);
                } catch (error) {
                    setError('Error al obtener la mascota.');
                    setLoading(false);
                }
            }
        };

        fetchPet();
    }, [petId]);

    if (!petId) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full">
                    <div className="p-6">
                        {loading ? (
                            <p>Cargando...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : pet ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">{pet.name}</h2>
                                <img src={pet.photo_url} alt={pet.name} className="mb-4" />
                                <p className="mb-2">{pet.description}</p>
                                <p className="mb-2">Location: {pet.location}</p>
                                <p className="mb-2">Status: {pet.status}</p>
                                {pet.breed && <p className="mb-2">Breed: {pet.breed}</p>}
                                {pet.age && <p className="mb-2">Age: {pet.age}</p>}
                                {pet.personality && <p className="mb-2">Personality: {pet.personality}</p>}
                                {pet.adoption_requirements && <p className="mb-2">Adoption Requirements: {pet.adoption_requirements}</p>}
                            </>
                        ) : (
                            <p>No se encontró la mascota.</p>
                        )}
                        <button
                            onClick={handleEditClick}
                            className="mt-4 mr-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Edit
                        </button>

                        <button
                            onClick={onClose}
                            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Close
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetModal;