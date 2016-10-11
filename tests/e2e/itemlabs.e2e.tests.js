'use strict';

describe('Itemlabs E2E Tests:', function () {
  describe('Test Itemlabs page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/itemlabs');
      expect(element.all(by.repeater('itemlab in itemlabs')).count()).toEqual(0);
    });
  });
});
