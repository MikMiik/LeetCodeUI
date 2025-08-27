import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// eslint-disable-next-line react/prop-types
const Icon = ({ name, className, size = "1x", ...props }) => {
    return (
        <FontAwesomeIcon
            icon={name}
            className={className}
            size={size}
            {...props}
        />
    );
};

export default Icon;
