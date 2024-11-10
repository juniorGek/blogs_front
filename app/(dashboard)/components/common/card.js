import {Card} from "reactstrap";

const DashboardCard = ({title, number}) => {
    return (
        <Card className="dashboard-card">
            <div className="body position-relative">
                <p className="text-muted mb-2 fw-semibold text-14">{number}</p>
                <h4 className="mb-0">{title}</h4>
                

            </div>
        </Card>
    )
}

export default DashboardCard