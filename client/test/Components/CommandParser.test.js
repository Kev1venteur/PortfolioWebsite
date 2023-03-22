import { describe, it, expect } from '@jest/globals';
import CommandParser from '../../src/Containers/Terminal/CommandParser';
import allPackages_MOCK from '../Resources/allPackages_MOCK'

describe('CommandParser', () => {
    const allPackages = {...allPackages_MOCK}

    it('test clear', () => {
        expect(CommandParser('clear',allPackages)).toEqual('clear')
    })

    it('test help', () => {
        expect(CommandParser('help',allPackages)).toBeDefined()
    })

    it('test ls', () => {
        expect(CommandParser('ls',allPackages)).toBeDefined()
    })

    it('test open', () => {
        expect(CommandParser('open file',allPackages)).toBeDefined()

        allPackages.os.open = (a,b)=>{return ['guest']}
        expect(CommandParser('open file',allPackages)).toBeDefined()

        allPackages.os.open = (a,b)=>{return ['other']}
        expect(CommandParser('open file',allPackages)).toBeDefined()
    })

    it('test reset', () => {
        expect(CommandParser('reset',allPackages)).toBeDefined()
        expect(CommandParser('reset extra',allPackages)).toBeDefined()
    })

    it('test no command', () => {
        expect(CommandParser('',allPackages)).toBeDefined()
    })
});