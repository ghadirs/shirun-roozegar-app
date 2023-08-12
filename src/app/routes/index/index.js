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
    var arr = [];
    var playersCount = selectedPlayers.length;
    var playersPerTeam = Math.abs(playersCount / 2);
    var minPlayersPerTeam = Math.floor(playersCount / 2);
    var hasSubPlayers = playersPerTeam - minPlayersPerTeam;
    console.log(hasSubPlayers);
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
          <Button type='primary' onClick={() => createTeams()}>
            بعدی
          </Button>
        </>
      ) : stage === "TEAMS" ? (
        <div>
          {teams.map((team) => (
            <div>{team.map((player) => player.name)}</div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default IndexPage;
