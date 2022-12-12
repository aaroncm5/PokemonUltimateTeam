import "./HomePage.scss";
import SingleMon from "../../components/singleMon/SingleMon";
import TeamMember from "../../components/teamMember/TeamMember";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(LineElement, PointElement, Tooltip, RadialLinearScale);

function HomePage({isLoggedIn}) {
  const [team, setTeam] = useState([]);
  const [teamHp, setTeamHp] = useState(0);
  const [teamAtk, setTeamAtk] = useState(0);
  const [teamDef, setTeamDef] = useState(0);
  const [teamSpAtk, setTeamSpAtk] = useState(0);
  const [teamSpDef, setTeamSpDef] = useState(0);
  const [teamSpd, setTeamSpd] = useState(0);

  // check local storage if a team is store, if so then set current team to that teams
  useEffect(() => {
    if (sessionStorage.getItem('team') !== null) {
      const storedTeam = sessionStorage.getItem('team')
      setTeam(JSON.parse(storedTeam))
    }
  }, [])
  
  // add a pokemon to the team with random moves and store it in browser
  const addToTeamDefault = (id) => {
    if (team.length > 5) {
      return;
    }

    axios.get(`http://localhost:8080/pokemon/${id}/default`).then((res) => {
      setTeam([...team, res.data[0]]);
      sessionStorage.setItem("team", JSON.stringify([...team, res.data[0]]))
    });
  };

  // clear the current team from screen and storage
  const clearTeam = () => {
    setTeam([]);
    sessionStorage.removeItem('team')
  };

  // set up team stats to constantly update as pokemon are added for the stats chart
  useEffect(() => {
    const teamStats = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < team.length; i++) {
      teamStats[0] += team[i].hp;
      teamStats[1] += team[i].attack;
      teamStats[2] += team[i].defense;
      teamStats[3] += team[i].special_attack;
      teamStats[4] += team[i].special_defense;
      teamStats[5] += team[i].speed;
    }

    setTeamHp(teamStats[0]);
    setTeamAtk(teamStats[1]);
    setTeamDef(teamStats[2]);
    setTeamSpAtk(teamStats[3]);
    setTeamSpDef(teamStats[4]);
    setTeamSpd(teamStats[5]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team.length]);

  // get list of all pokemon from database
  const [pokeList, setPokeList] = useState([]);
  useEffect(
    () => {
      axios.get(`http://localhost:8080/pokemon/all`).then((res) => {
        setPokeList(res.data);
      });
    },
    [],
    pokeList
  );

  if (pokeList.length < 1) {
    return <div>loading</div>;
  }

  // set data and data styles for radar chart
  const data = {
    labels: [
      `Hp: ${teamHp}`,
      `Atk: ${teamAtk}`,
      `Sp_Atk: ${teamSpAtk}`,
      `Spd: ${teamSpd}`,
      `Sp_Def: ${teamSpDef}`,
      `Def: ${teamSpDef}`,
    ],
    datasets: [
      {
        label: "Team Stats",
        data: [teamHp, teamAtk, teamSpAtk, teamSpd, teamSpDef, teamDef],
        backgroundColor: "white",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  // set chart styles and scales for radar chart
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "white",
        },
        pointedLabels: {
          backdropColor: "white",
        },
        grid: {
          color: "white",
        },
        title: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 250,
        ticks: {
          display: false,
        },
        fill: true,
      },
    },
  };

  // store a team in the database
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isLoggedIn === false) {
      console.log('please log in')
      return
    }
    const myTeam = {
      user_id: sessionStorage.getItem('userId'),
      id: uuidv4(),
      team_name: event.target.teamName.value,
      team_members: [...team]
    }

    for (let i=0; i<myTeam.team_members.length; i++) {
      myTeam.team_members[i].team_id = myTeam.id;
      myTeam.team_members[i].user_id = myTeam.user_id;
      delete myTeam.team_members[i].id;
      myTeam.team_members[i].id=uuidv4();
      myTeam.team_members[i].move1=myTeam.team_members[i].moves[0]
      myTeam.team_members[i].move2=myTeam.team_members[i].moves[1]
      myTeam.team_members[i].move3=myTeam.team_members[i].moves[2]
      myTeam.team_members[i].move4=myTeam.team_members[i].moves[3]
      delete myTeam.team_members[i].moves;
    }

    axios.post('http://localhost:8080/pokemon/team', myTeam)
    .then(()=>{
      sessionStorage.removeItem('team')
      setTeam([]);
      event.target.reset()

    })

  };

  return (
    <section className="container">
      <div className="team-container">
        <form onSubmit={handleSubmit} className="create">
          <input
            className="create__title"
            name="teamName"
            placeholder="Enter Team Name"
          />
          <div className="create-team">
            {team.map((member) => {
              const {
                ability1,
                ability2,
                attack,
                defense,
                special_attack,
                special_defense,
                speed,
                id,
                name,
                type1,
                type2,
                sprite,
                moves,
              } = member;

              return (
                <TeamMember className='create-team__member'
                  key={id}
                  ability1={ability1}
                  ability2={ability2}
                  attack={attack}
                  defense={defense}
                  special_attack={special_attack}
                  special_defense={special_defense}
                  speed={speed}
                  id={id}
                  name={name}
                  type1={type1}
                  type2={type2}
                  sprite={sprite}
                  moves={moves}
                />
              );
            })}
          </div>
          <div className="create-button">
            <button type="submit" className="create-button__save">Save</button>
            <button className="create-button__clear" onClick={() => clearTeam()}></button>
          </div>
          
        </form>

        <div className="team-stats">
          <h2 className="team-stats__title">Team Stats</h2>
          <Radar data={data} options={options} />
        </div>
      </div>

      <div className="pokemon-list-container">
        {pokeList.map((pokemon) => {
          const {
            ability1,
            ability2,
            attack,
            defense,
            special_attack,
            special_defense,
            speed,
            id,
            name,
            type1,
            type2,
            sprite,
          } = pokemon;

          return (
            <SingleMon
              key={id}
              addMon={addToTeamDefault}
              ability1={ability1}
              ability2={ability2}
              attack={attack}
              defense={defense}
              special_attack={special_attack}
              special_defense={special_defense}
              speed={speed}
              id={id}
              name={name}
              type1={type1}
              type2={type2}
              sprite={sprite}
            />
          );
        })}
      </div>
    </section>
  );
}

export default HomePage;
