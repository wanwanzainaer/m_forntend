import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
const Users = () => {
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    (async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );

        setLoadedUser(responseData.users);
      } catch (err) {}
    })();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUser && <UsersList items={loadedUser} />}
    </>
  );
};

export default Users;
