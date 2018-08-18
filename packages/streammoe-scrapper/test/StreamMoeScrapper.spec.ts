import { StreamMoeScrapper } from '../lib';

import { ISourceData } from '../../sourcescrapper-core';

import chai = require('chai');
import 'mocha';
chai.should();

describe('StreamMoeScrapper', () => {
    const url = 'https://www.stream.moe/embed2/0772361f2d432d93';
    it('should detect a valid url', () => {
         const scrapper = new StreamMoeScrapper();
         scrapper.isApplicable(url).should.be.true;
    });
    it('should scrap data from a test page', async () => {
        const scrap = await StreamMoeScrapper.scrap(url);
        scrap.should.have.property('success').that.is.a('boolean').and.that.is.true;
        scrap.should.have.property('data').that.is.an('object').and.that.is.not.undefined;
        const data = scrap.data as ISourceData;
        data.should.have.property('sources').that.is.an('array');
        data.sources.length.should.be.greaterThan(0);
        data.sources.forEach(h => h.should.have.property('url').that.is.a('string'));
    });
});