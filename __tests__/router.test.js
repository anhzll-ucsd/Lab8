import { pushToHistory } from '../scripts/router.js';


describe('tests', () => {
    test('pushToHistorySettings', () => {
        let val  = history.length;
        pushToHistory('settings',0);
        expect(history.length).toBe(val + 1);
        expect(history.state).toEqual({"page" : "settings"});
    });
  
    test('pushToHistoryEntry', () => {
        let val  = history.length;
        pushToHistory('entry',0);
        expect(history.length).toBe(val + 1);
        expect(history.state).toEqual({ "page": `entry${0}` });
      });

      test('pushToHistoryEntry', () => {
        
        let val  = history.length;
        pushToHistory('',0);
        expect(history.length).toBe(val + 1);
        expect(history.state).toEqual({});
      });
  });