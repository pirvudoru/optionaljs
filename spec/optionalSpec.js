var Optional = require('../src/optional');

describe('Optional', function () {
  var item, subject;

  beforeEach(function () {
    item = {}
  });

  describe('from', function () {
    beforeEach(function () {
      subject = function () {
        return Optional.from(item);
      }
    });

    it('returns an Optional instance', function () {
      expect(subject() instanceof Optional).toBe(true);
    });

    describe('value', function () {
      beforeEach(function () {
        var superSubject = subject;

        subject = function () {
          var optional = superSubject();

          return optional.value();
        }
      });

      it('returns wrapped value', function () {
        expect(subject()).toBe(item);
      });
    });

    describe('try', function () {
      var prop, args;

      beforeEach(function () {
        var superSubject = subject;

        args = [];
        prop = 'property';

        subject = function () {
          var optional = superSubject();

          return optional.try.apply(optional, [prop].concat(args));
        }
      });

      it('returns optional instance', function () {
        expect(subject() instanceof Optional).toBe(true);
      });

      describe('value', function () {
        var defaultValue;

        beforeEach(function () {
          var superSubject = subject;

          delete defaultValue;

          subject = function () {
            var optional = superSubject();

            return optional.value(defaultValue);
          }
        });

        it('returns undefined', function () {
          expect(subject()).toBeUndefined();
        });

        describe('defaultValue is defined', function () {
          beforeEach(function () {
            defaultValue = 42;
          });

          it('returns default value', function () {
            expect(subject()).toEqual(42);
          });
        });

        describe('defaultValue is a function', function () {
          beforeEach(function () {
            defaultValue = function () {
              return 42;
            };
          });

          it('returns function result', function () {
            expect(subject()).toEqual(42);
          });
        });

        describe('property has value', function () {
          beforeEach(function () {
            item[prop] = 'test';
          });

          it('returns value', function () {
            expect(subject()).toEqual('test');
          });
        });

        describe('property is function', function () {
          beforeEach(function () {
            item[prop] = jasmine.createSpy('prop');
          });

          it('returns result from function', function () {
            item[prop].andReturn('result');

            expect(subject()).toEqual('result');
          });

          describe('arguments are defined', function () {
            beforeEach(function () {
              args = [42, 'test'];
            });

            it('calls method with arguments', function () {
              subject();

              expect(item[prop]).toHaveBeenCalledWith(42, 'test');
            });
          });
        });
      });
    });
  });
});