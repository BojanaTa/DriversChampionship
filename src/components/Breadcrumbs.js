import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";




const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    console.log("breadcrumbs", breadcrumbs);

     return(
        <div>
            {breadcrumbs.map(({match,  breadcrumb, location}) => (
                <Link  key={match.pathname} to={match.pathname} state={location.state}>
                    <input type="button" value={breadcrumb.props.children}/>

                </Link>
            ))}
        </div>
        );
                
}

export default Breadcrumbs;