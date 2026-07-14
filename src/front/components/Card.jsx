import { Link } from "react-router-dom";

export const Card = (props) => {
    return (
        <div>
            <div className="card" >
                <img src={props.url} className="card-img-top" alt={props.title} />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.subtitle}</p>
                    {/*<hr />
                    <Link to={props.buttonLink} className="btn btn-primary"> {props.buttonText} </Link>*/}
                </div>
            </div>
        </div>
    )
}