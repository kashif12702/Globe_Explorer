import Cookies from 'js-cookie';

export const handler = (Component) => {
    return function (props) {
        const auth = useAuth();

        useEffect(() => {
            // Redirect if not signed in
            if (!Cookies.get('token')) {
                router.replace("/signin");
            }
        }, [auth]);

        if (!auth.user) {
            return <>loading...</>;
        }

        return <Component {...props} />;
    };
};