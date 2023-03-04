import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProject } from "../../../Interface";
import ModelPositionControls from "./ModelPositionContorls";
import ModelRotationControls from "./ModelRotationControls";

interface Props {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  currentProject: IProject;
  selectedGroup: {
    id: number;
    name: string;
  };
  setSelectedGroup: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
    }>
  >;
  groupPosition: [number, number, number];
  setGroupPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  groupRotation: [number, number, number];
  setGroupRotation: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  setSelectedModel: Dispatch<
    SetStateAction<{
      type: string;
      id: number;
    }>
  >;
}

function ModelGroupControls(props: Props) {
  const {
    setRefresh,
    currentProject,
    selectedGroup,
    setSelectedGroup,
    groupPosition,
    setGroupPosition,
    groupRotation,
    setGroupRotation,
    setSelectedModel,
  } = props;
  const [groupName, setGroupName] = useState<string>("");
  const params = useParams();
  const [editName, setEditName] = useState<string>("");
  const [parentGroupId, setParentGroupId] = useState<number>(0);
  const [parentGroupName, setParentGroupName] = useState<string>("None");
  const [isDisabled, setIsDisabled] = useState<{
    create: boolean;
    copy: boolean;
  }>({ create: false, copy: false });

  // options for group selection
  const groupList = currentProject.model_groups?.map((group) => (
    <option key={group.id} value={group.id}>
      {group.group_name}
    </option>
  ));

  // options for group attachment
  const assignList = currentProject.model_groups
    ?.filter((group) => group.id !== selectedGroup.id)
    .map((group) => (
      <option key={group.id} value={group.id}>
        {group.group_name}
      </option>
    ));

  useEffect(() => {
    if (assignList.length > 0) {
      setParentGroupId(assignList[0].props.value);
    }
  }, [selectedGroup]);

  useEffect(() => {
    const currentGroup = currentProject.model_groups.filter(
      (group) => group.id === selectedGroup.id
    );
    if (currentGroup.length > 0) {
      setParentGroupName(currentGroup[0].parent_group_name || "None");
    }
  }, [currentProject, selectedGroup]);

  function createGroup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    disableBtn("create");
    fetch("/model_groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: params.project_id,
        group_name: groupName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setSelectedGroup({ id: data.id, name: data.group_name });
            setGroupName("");
          });
        } else {
          res.json().then((message) => alert(message.errors));
        }
      })
      .catch(console.error);
  }

  function editGroupName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`/model_groups/${selectedGroup.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        group_name: editName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setSelectedGroup({ id: data.id, name: data.group_name });
            setEditName("");
          });
        } else {
          res.json().then((message) => alert(message.errors));
        }
      })
      .catch(console.error);
  }

  function attachToParentGroup() {
    fetch(`/model_groups/${selectedGroup.id}/attach`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent_group_id: parentGroupId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then(() => setRefresh((state: boolean) => !state));
        } else {
          res.json().then((message) => alert(message.error));
        }
      })
      .catch(console.error);
  }

  function detachFromParentGroup() {
    fetch(`/model_groups/${selectedGroup.id}/detach`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then(() => setRefresh((state: boolean) => !state));
        } else {
          res.json().then((message) => alert(message.error));
        }
      })
      .catch(console.error);
  }

  function deleteGroup() {
    if (window.confirm("Are you sure?")) {
      if (selectedGroup.id > 0) {
        fetch(`/model_groups/${selectedGroup.id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              res.json().then(() => {
                setSelectedGroup({
                  id: currentProject.model_groups[0].id,
                  name: currentProject.model_groups[0].group_name,
                });
              });
            } else res.json().then((data) => alert(data.message));
          })
          .catch(console.error);
      }
    }
  }

  function copyGroup() {
    if (window.confirm("Are you sure?")) {
      if (selectedGroup.id > 0) {
        const id = selectedGroup.id;
        // to trigger a save before copy
        setSelectedGroup({ ...selectedGroup, id: 0 });
        setSelectedModel({ type: "", id: 0 });
        setTimeout(() => {
          fetch(`/model_groups_copy/${id}`, {
            method: "POST",
          })
            .then((res) => {
              if (res.ok) {
                res
                  .json()
                  .then((data) =>
                    setSelectedGroup({ id: data.id, name: data.group_name })
                  );
              } else res.json().then(console.log);
            })
            .catch(console.error);
        }, 500);
      }
    }
  }

  function disableBtn(type: string) {
    setIsDisabled({ ...isDisabled, [type]: true });
    setTimeout(() => {
      setIsDisabled({ create: false, copy: false });
    }, 2000);
  }

  return (
    <div className="w-full py-2 mb-2 bg-gray-600 border-t border-b border-black">
      <div className="flex mb-2">
        <h1 className="mr-3">Group Controls:</h1>
        <button
          className="design-btn min-w-fit px-2 hover:bg-red-500"
          onClick={deleteGroup}
        >
          Delete Group
        </button>
      </div>
      {/* new group */}
      <div className="flex">
        <h1 className="w-1/3">New Group:</h1>
        <form onSubmit={createGroup}>
          <input
            className="design-input"
            name="group-name"
            placeholder="Enter Group Name"
            maxLength={50}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
          <button
            className="design-btn"
            type="submit"
            disabled={isDisabled.create}
          >
            Create
          </button>
        </form>
      </div>
      {/* group selection */}
      <div className="flex">
        <h1 className="w-1/3">Select Group:</h1>
        <select
          className="design-input"
          value={selectedGroup.id}
          onChange={(e) =>
            setSelectedGroup({
              id: parseInt(e.target.value),
              name: e.target.options[e.target.selectedIndex].text,
            })
          }
        >
          {groupList}
        </select>
        <button
          className="design-btn"
          disabled={isDisabled.copy}
          onClick={() => {
            disableBtn("copy");
            copyGroup();
          }}
        >
          Copy
        </button>
      </div>
      {/* edit group name */}
      <div className="flex">
        <h1 className="w-1/3">Group Name:</h1>
        <form onSubmit={editGroupName}>
          <input
            className="design-input"
            name="edit-group-name"
            placeholder={selectedGroup.name}
            maxLength={50}
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
          />
          <button className="design-btn" type="submit">
            Edit
          </button>
        </form>
      </div>
      {/* group assignment */}
      <div className="flex">
        <h1 className="w-1/3">Parent Group:</h1>
        <p className="mx-2 w-130">{parentGroupName}</p>
        <button className="design-btn" onClick={detachFromParentGroup}>
          Detach
        </button>
      </div>
      <div className="flex">
        <h1 className="w-1/3">Attach to:</h1>
        <select
          className="design-input"
          value={parentGroupId}
          onChange={(e) => setParentGroupId(parseInt(e.target.value))}
        >
          {assignList}
        </select>
        <button className="design-btn" onClick={attachToParentGroup}>
          Attach
        </button>
      </div>
      <ModelPositionControls
        type="Group"
        position={groupPosition}
        setPosition={setGroupPosition}
      />
      <ModelRotationControls
        type="Group"
        rotation={groupRotation}
        setRotation={setGroupRotation}
      />
    </div>
  );
}

export default ModelGroupControls;
