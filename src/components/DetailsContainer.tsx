import "../styles/Details.css";

interface Props {
    ip_address: string;
    region: string;
    postcode: string;
    city: string;
    timezone: string;
    isp: string;
}

interface DetailsContainerProps {
    ipData: Props | null;
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ ipData }) => {
    return (
        <div className="details-wrapper">
            <div className="details-container">
                <div className="details-item">
                    <p className="details-title">IP Address</p>
                    <p className="details-text">{ipData?.ip_address}</p>
                </div>
                <div className="details-item">
                    <p className="details-title">Location</p>
                    <p className="details-text">{ipData?.city}, {ipData?.region}, {ipData?.postcode}</p>
                </div>
                <div className="details-item">
                    <p className="details-title">TimeZone</p>
                    <p className="details-text">{ipData?.timezone}</p>
                </div>
                <div className="details-item">
                    <p className="details-title">ISP</p>
                    <p className="details-text">{ipData?.isp}</p>
                </div>
            </div>
        </div>
    );
}

export default DetailsContainer;