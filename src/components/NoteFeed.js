import React from "react";
import styled from "styled-components";
import {Link} from 'react-router-dom';

const NoteWrapper = styled.div`
  max-width:800px;
  margin: 0 auto;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 3px solid #f5f4f0;
`;

import Note from './Note';

const NoteFeed = ({notes}) => {
  return(
    <div>
      {notes.map(note =>(
        <NoteWrapper key={note.id}>
          <Note note={note} />
          <Link to={`note/${note.id}`}>Permalink</Link>
          </NoteWrapper>
      ))}
    </div>
  );
};

export default NoteFeed;