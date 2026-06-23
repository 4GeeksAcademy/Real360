export default function BackendStatusSection({ store }) {
	return (
        <div className="text-center mt-5">
            <div className="alert alert-info">
                {store.message ? (
                <span>{store.message}</span>
                ) : (
                <span className="text-danger">
                    Loading message from the backend (make sure your python 🐍 backend is running)...
                </span>
                )}
            </div>
        </div>
	);
}