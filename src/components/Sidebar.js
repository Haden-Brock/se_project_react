import '../blocks/Sidebar.css';

function Sidebar ({ userName, avatar }) {
    return (
    <div className="sidebar">
        <img src={avatar} alt="Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">{userName}</p>
    </div>
    )
}

export default Sidebar;