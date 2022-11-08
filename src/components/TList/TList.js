import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, TextField } from '@mui/material';
import './TList.css'


export default function TList() {
  const [checked, setChecked] = React.useState([0]);
  const [arr, setArr] = React.useState([1, 2, 3, 4]);
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addRow = () => {
    setLoading(true)

    fetch('http://localhost:3200/hello')
      .then(res => res.json())
      .then(() => {
        const a = value.length === 0 ? [...arr, arr.filter(d => Number.isInteger(d)).slice(-1)[0] + 1] : [...arr, value]
        setArr(a)
        setValue('')
        setLoading(false)
      })
  }

  const textFieldChange = (e) => {
    setValue(e.target.value)
  }

  return (
    <div className='main'>
      <TextField value={value} onChange={textFieldChange} className='text-field' data-cy="text-field" id="outlined-basic" label="Type here" variant="outlined" />

      <List data-cy="list" sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {arr.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              data-cy={"list-item-" + value}
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    data-cy={"checkbox-" + value}
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText data-cy={"item-text-" + value} id={labelId} primary={`Line item ${value}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Button data-cy="button" disabled={loading} variant='contained' onClick={() => addRow()}>Add row</Button>
    </div>
  );
}
