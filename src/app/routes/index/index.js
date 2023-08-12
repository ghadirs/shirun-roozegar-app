import * as React from "react";
import "./index.scss";
import { Button, Select } from "antd";
import { options, teamCountOptions } from "./options";

function IndexPage() {
  const defaultTeamSize = 5;
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [stage, setStage] = React.useState("PLAYERS_SELECTION");
  const [teamCount, setTeamCount] = React.useState(teamCountOptions[0]);
  const [teams, setTeams] = React.useState([]);

  const createTeams = () => {
    var finalTeams = [];
    var finalPlayers = [];
    var playersCount = selectedPlayers.length;
    var playersPerTeam = Math.abs(
      playersCount / Math.floor(playersCount / defaultTeamSize)
    );
    var minPlayersPerTeam = Math.floor(
      playersCount / Math.floor(playersCount / defaultTeamSize)
    );
    var teamsCount = Math.floor(playersCount / minPlayersPerTeam);
    var subPlayersCount = playersCount - minPlayersPerTeam * 3;

    selectedPlayers.forEach((plyr) => {
      let max = teamsCount;
      let min = 1;
      let randomPlayerTeamId = Math.floor(Math.random() * max) + min;
      return finalPlayers.push({
        ...plyr,
        teamId: randomPlayerTeamId,
      });
    });

    var teamsCountArray = [];

    for (let i = 1; i <= teamsCount; i++) {
      teamsCountArray.push(i);
    }

    var sampleTeamsArr = Array.from(teamsCountArray);
    console.log(teamsCountArray);

    sampleTeamsArr.forEach((team) =>
      finalTeams.push(finalPlayers.filter((plyr) => plyr.teamId == team))
    );

    setTeams(finalTeams);
  };

  return (
    <div id='index-page'>
      {stage === "TEAM_COUNT_SELECTION" ? (
        <>
          <Select
            value={teamCount}
            options={teamCountOptions}
            onChange={(value, option) => setTeamCount(value)}
            placeholder='تعداد تیم ها را انتخاب کنید'
          >
            {options.map((item) => {
              return (
                <Select.Option key={item.value}>{item.label}</Select.Option>
              );
            })}
          </Select>

          <Button type='primary' onClick={() => setStage("PLAYERS_SELECTION")}>
            بعدی
          </Button>
        </>
      ) : stage === "PLAYERS_SELECTION" ? (
        <>
          <Select
            allowClear
            mode='multiple'
            value={selectedPlayers}
            options={options}
            onChange={(value, option) => setSelectedPlayers(option)}
            placeholder='بازیکنان حاضر را انتخاب کنید'
          >
            {options.map((item) => {
              return (
                <Select.Option key={item.value}>{item.label}</Select.Option>
              );
            })}
          </Select>
          <span>تعداد بازیکنان: {selectedPlayers.length}</span>
          <Button type='primary' onClick={() => createTeams()}>
            بعدی
          </Button>

          <div>
            {teams &&
              teams.length > 0 &&
              teams.map((team, index) => (
                <ul>
                  <span>team {index + 1}</span>
                  {team.map((player) => (
                    <li>{player.label}</li>
                  ))}
                </ul>
              ))}
          </div>
        </>
      ) : stage === "TEAMS" ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IndexPage;
