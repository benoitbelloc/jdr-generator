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
    saveChange: any
    handleClose: () => void
}

export type CharacterMainDataProps = {
    deleteCharacter: () => void,
    selectValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    changeValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    saveChange: any,
    handleOpen: () => void
}

export type CharacterTraitsAndCompetencesProps = {
    changeValue: (event: {target: {className: string, classList: string[] | any, name: string, value: string}}) => void,
    saveChange: any
}

export type CharacterWeaponsProps = {
    addWeapon: () => void,
    changeWeapon: (event: {target: {name: string, value: string}}) => void,
    deleteWeapon: (event: any) => void
}

// User

export type User = {
  id: number,
  username: string
}

// Classes

type MaxMin = {
  max: number,
  min: number
}

export type Class = {
  id: string,
  name: string,
  url: string,
  weapons: string[],
  stats: {
    hp: MaxMin,
    mp: MaxMin,
    atk: MaxMin,
    def: MaxMin
  },
  talents: {
    physical: MaxMin,
    intellect: MaxMin,
    dexterity: MaxMin,
    charism: MaxMin
  }
}