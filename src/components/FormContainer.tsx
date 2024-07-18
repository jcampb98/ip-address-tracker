import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { getEnviroments } from "../utils/getEnviroments";
import axios, { AxiosError } from "axios";
import "../styles/Form.css";

interface Props {
    ip_address: string;
    postcode: string;
    region: string;
    city: string;
    timezone: string;
    isp: string;
    longitude: number;
    latitude: number;
}

interface FormContainerProps {
    setIpData: (data: Props) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({ setIpData }) => {
    const [validated, setValidated] = useState(false);
    const [userText, setUserText] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const signal = axios.CancelToken.source();

    const { IP_GEO_API_KEY } = getEnviroments();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserText(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const form = event.currentTarget;

        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        event.preventDefault();

        axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${IP_GEO_API_KEY}&ipAddress=${userText}`, {
            cancelToken: signal.token,
        })
        .then(response => {
            const data = response.data;

            console.log(data);

            const ipData: Props = {
                ip_address: data.ip,
                postcode: data.location.postalCode,
                region: data.location.region,
                city: data.location.city,
                timezone: data.location.timezone,
                isp: data.isp,
                longitude: data.location.lng,
                latitude: data.location.lat,
            };

            setIpData(ipData); // Passes the data back to the parent component
        })
        .catch((error) => {
            const axiosError = error as AxiosError;

            if(axios.isCancel(error)) { 
                console.log('Request canceled', axiosError.message);
            }

            else if(axiosError.response) {
                // Server responsed with a status other than 200
                console.log('Request error:', axiosError.response.data);
                setStatusMessage('Error: No response received from the server.');
            }

            else if(axiosError.request) {
                // Request was made but no response received
                setStatusMessage('Error: No response received from the server.');
            }

            else {
                console.log('General error:', axiosError.message);
                setStatusMessage(`Error: ${axiosError.message}`);
            }

            setShowModal(true);
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setStatusMessage("");
    };

    return (
        <div className="component-main">
            <picture className="background-image">
                <img className="background-img" src="../../images/pattern-bg-desktop.png" alt="background image of squares" />
            </picture>
            <div className="container">
                <h4 className="title">IP Address Tracker</h4>
                <Form className="input-group" validated={validated} onSubmit={handleSubmit}>
                    <Form.Control
                        required
                        onChange={handleChange}
                        className="input-field" 
                        type="text" 
                        placeholder="Search for any IP address or domain" 
                    />
                    <button className="submit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg>
                    </button>
                </Form>
                {
                    showModal && 
                    <div className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Error</h5>
                                    <button className="btn-close" onClick={handleCloseModal}>X</button>
                                </div>
                                <div className="modal-body">
                                    {statusMessage}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default FormContainer;