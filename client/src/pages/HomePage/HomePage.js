import "./HomePage.scss";
import SingleMon from "../../components/singleMon/SingleMon";
import TeamMember from "../../components/teamMember/TeamMember";
import axios from "axios";
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

function HomePage() {
  const [team, setTeam] = useState([]);
  const [teamHp, setTeamHp] = useState(0);
  const [teamAtk, setTeamAtk] = useState(0);
  const [teamDef, setTeamDef] = useState(0);
  const [teamSpAtk, setTeamSpAtk] = useState(0);
  const [teamSpDef, setTeamSpDef] = useState(0);
  const [teamSpd, setTeamSpd] = useState(0);

  const addToTeamDefault = (id) => {
    if (team.length > 5) {
      return;
    }

    axios.get(`http://localhost:8080/pokemon/${id}/default`).then((res) => {
      setTeam([...team, res.data[0]]);
    });
  };

  const clearTeam = () => {
    setTeam([]);
  };

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

//   console.log(team);

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
        // backgroundColor: 'black',
        // borderColor: 'white',

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

  const handleSubmit = (event) => {
    event.preventDefault();
    team.teamName = event.target.teamName.value;
    console.log(team);
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
          <button type="submit" className="create__save">
            Save Team
          </button>
          <button className="create__clear" onClick={() => clearTeam()}>
            Clear
          </button>
        </form>

        <div className="team-stats">
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
