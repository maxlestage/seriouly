import './UsersPanel.css'

const MOCK_USERS = [
  { id: 1, name: 'Aucun utilisateur', email: '—', status: 'inactive', joined: '—', matches: 0 },
]

const UsersPanel = () => {
  return (
    <div className="users">
      <div className="users__toolbar">
        <input
          className="users__search"
          type="text"
          placeholder="Rechercher un utilisateur..."
        />
        <div className="users__filters">
          <button className="users__filter users__filter--active">Tous</button>
          <button className="users__filter">Actifs</button>
          <button className="users__filter">Bannis</button>
        </div>
      </div>

      <div className="users__table-wrap">
        <table className="users__table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Inscription</th>
              <th>Matchs</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map((user) => (
              <tr key={user.id}>
                <td className="users__name">{user.name}</td>
                <td className="users__email">{user.email}</td>
                <td>
                  <span className={`users__status users__status--${user.status}`}>
                    {user.status === 'active' ? 'Actif' : user.status === 'banned' ? 'Banni' : 'Inactif'}
                  </span>
                </td>
                <td className="users__date">{user.joined}</td>
                <td>{user.matches}</td>
                <td>
                  <button className="users__action">Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users__empty">
        Aucun utilisateur pour l'instant. Les données apparaitront une fois le backend connecté.
      </div>
    </div>
  )
}

export default UsersPanel
