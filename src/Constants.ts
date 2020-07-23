import { IExtension } from './Interfaces';

export const definedExtensions:Record<string, IExtension> = {
  '.AppImage': {
    name: 'Linux',
    color: '#A88C46'
  },
  '.exe': {
    name: 'Windows',
    color: '#F2C62E'
  },
  '.dmg': {
    name: 'Mac',
    color: '#E27827'
  },
  '.vsix': {
    name: 'Visual Studio extensions',
    color: '#F2C62E'
  }
};
