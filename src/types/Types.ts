import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

// Character

export type CharacterInfos = {
    avatar?: string,
    name: string,
    type: string,
    class: string
}

export type CharacterStats = {
  level: number,
  hp: number,
  mp: number,
  atk: number,
  def: number,
}

export type CharacterTalents = {
  physical: number,
  intellect: number,
  dexterity: number,
  charism: number,
}

export type Character = {
  id?: number,
  userId?: number,
  infos: CharacterInfos,
  stats: CharacterStats,
  talents: CharacterTalents,
  weapons: string[],
  description?: string,
}

export type CharacterAvatarModalProps = {
    open: boolean,
    changeValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    saveChange: () => void
    handleClose: () => void
}

export type CharacterMainDataProps = {
    character: Character,
    deleteCharacter: () => void,
    changeValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    saveChange: (event: {target: {name: string, value: string}}) => void,
    handleOpen: () => void
}

export type CharacterTraitsAndCompetencesProps = {
    character: Character,
    changeValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    saveChange: (event: {target: {name: string, value: string}}) => void,
}

export type CharacterWeaponsProps = {
    character: Character,
    addWeapon: () => void,
    changeWeapon: (event: {target: {name: string, value: string}}) => void,
    saveChange: (event: {target: {name: string, value: string}}) => void,
    deleteWeapon: (event: any) => void
}

// User

export type User = {
  id: number,
  username: string
}