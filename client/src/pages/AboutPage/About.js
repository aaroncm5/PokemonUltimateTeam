import './About.scss';
import snorlax from '../../assets/icons/snorlax.png'

function About() {

    return(
        <section className='about'>
            <div className='about-header'>
                <h1 className='about-header__title'>About</h1>
                <img className='about-header__img' src={snorlax} alt="pokemon" />
            </div>

            <p className='about-info'>
                Team building is an integral part of the Pokemon experience. I wanted to give trainers a place where they can create any combination of pokemon they can think of, with any combination of moves. Giving them access to all the basic info about the team they've created and allow them to save that team for future review.
            </p>
            <p className='about-info'>
                Start by creating a team on the Homepage, any Pokemon can be chosen and will get a set of 4 random moves from their move list. If a custom set of moves is required, select the details button for that Pokemon. This will bring you to a page where you can see an in depth description of the Pokemon you chose. A custom set of moves can then be chosen from the list on that page. Once finished making your team, give it a name and click save although the save feature is only for users with an account.
            </p>
        </section>
    )
}

export default About;