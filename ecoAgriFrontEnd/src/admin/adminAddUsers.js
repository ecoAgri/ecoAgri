function UpdateUserForm(props) {
    console.log(props.userType);
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const setCharityFile = (value) => {
        setFile(value);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Helpers to validate Fname and Lname
    const hasNumber = (string) => {
        return /\d/.test(string);
    };

    const hasSpecialChars = (string) => {
        let pattern = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (string.match(pattern)) {
            return true;
        } else {
            return false;
        }
    };
    //-------------------

    //First Name Validate
    const {
        value: fname,
        isValid: fnameIsValid,
        hasError: fnameHasError,
        error: fnameError,
        valueChangeHandler: fnameChangeHandler,
        inputBlurHandler: fnameBlurHandler,
    } = useInput((value) => {
        if (hasNumber(value.trim())) {
            return { inputIsValid: false, error: "Can't contained numbers !" };
        } else if (hasSpecialChars(value.trim())) {
            return { inputIsValid: false, error: "Can't contained special chars !" };
        } else {
            return { inputIsValid: true, error: "" };
        }
    });
