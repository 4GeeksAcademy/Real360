import { Link } from "react-router-dom";

export const CardDetail = (props) => {

    return (
        <div>
            <div className="card starwars-card" >
                <img src={props.url} className="card-img-top" alt={props.title} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-description">{props.description}</p>
                </div>
                <ul class="list-group list-group-flush activity-list">
                    <li class="list-group-item">{props.activity1}</li>
                    <li class="list-group-item">{props.activity2}</li>
                    <li class="list-group-item">{props.activity3}</li>
                    <li class="list-group-item">{props.activity4}</li>
                </ul>
            </div>
            {/*<Link to="/contact" className="btn btn-primary"> Cotiza Ahora </Link>*/}
        </div>
    );
};