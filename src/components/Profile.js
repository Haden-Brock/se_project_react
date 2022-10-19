import '../blocks/Profile.css';
import avatar from '../images/avatar.svg';
import ClothesSection from './ClothesSection';
import Sidebar from './Sidebar';


function Profile({ handleCardClick, handleAddItemModal, weatherData, cardsList }) {
    const userName = "Terrence Tegegne";

    return (
        <main className="profile">
            <Sidebar userName={userName} avatar={avatar} />
            <ClothesSection 
                handleCardClick={handleCardClick}
                handleAddItem={handleAddItemModal}
                cardsList={cardsList}
            />
        </main>
    );
}

export default Profile;