


const Login = ({ login, isAuthenticated }) => {{
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <section className="container">
            <h1 class="large text-primary">Sign in</h1>
            <p className="lead">
                <i class="fas fa-user" /> Sign into your account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="placeholder"
                        name="password"
                        onChange={onChange}
                        minLength = "6"
                    />
                </div>
                <input type="submit" className="btn btn-pimrary" value="Login" />
            </form>

            <p className="my-1">
                Dont have an account? <Link to="/register">Sign up</Link>
            </p>
        </section>
    )
}};

Login.propTypes = {
    login: propTypes.func.isRequired,
    isAuthenticated: PropType.bool
}

