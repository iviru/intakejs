import Injector from "../lib/injector";

describe('Injector', ()=>{
  let injector: Injector;

  beforeEach(()=>{
    injector = new Injector();
  });

  it('injects service as dependency', ()=>{
    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    class Consumer {
      public getFoo() {
        return this.foo.method();
      }
      @injector.Inject('productor')
      private foo: Productor;
    }

    expect(new Consumer().getFoo()).toBe('foo');
  });

  it('init after injected', ()=>{
    class Consumer {
      public getFoo() {
        return this.foo && this.foo.method();
      }
      @injector.Inject('productor')
      private foo: Productor;
    }

    var consumer = new Consumer()
    expect(() => consumer.getFoo()).toThrow();

    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    expect(consumer.getFoo()).toBe('foo');
  });

  it('@Injectable decorator works', ()=>{
    @injector.Injectable('injectable_productor')
    class Productor {
      method() {
        return 'foo';
      }
    }

    class Consumer {
      public getFoo() {
        return this.foo.method();
      }
      @injector.Inject('injectable_productor')
      private foo: Productor;
    }

    expect(new Consumer().getFoo()).toBe('foo');
  });


  describe('@ConstructorInject', ()=>{
    let Productor1: any, Productor2: any, Consumer: any;

    beforeEach(()=>{
      @injector.Injectable('Productor1')
      class _Productor1 {
        method() {
          return 'foo';
        }
      }

      @injector.Injectable('Productor2')
      class _Productor2 {
        method() {
          return 'bar';
        }
      }

      @injector.ConstructorInject("Productor1", "Productor2")
      class _Consumer {
        constructor(private foo?: _Productor1, private bar?: _Productor2) {

        }
        public getFooBar() {
          return this.foo.method() + this.bar.method();
        }
      }

      Productor1 = _Productor1;
      Productor2 = _Productor2;
      Consumer = _Consumer;
    });




    it('injects deps in constructor', ()=>{
      expect(new Consumer().getFooBar()).toBe('foobar');
    });

    it('do not injects specified deps', ()=>{
      expect(new Consumer({
        method: ()=>'zap'
      }).getFooBar()).toBe('zapbar');
    });
  });



  it('creates and clears separate test context', ()=>{
    class Consumer {
      public getFoo() {
        return this.foo && this.foo.method();
      }
      @injector.Inject('productor')
      private foo: Productor;
    }

    var consumer = new Consumer()

    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    injector.createTestContext();

    injector.getContext().register<any>('productor', { method: ()=>'test_foo'}, true);

    expect(consumer.getFoo()).toBe('test_foo');

    injector.clearTestContext();

    expect(consumer.getFoo()).toBe('foo');
  });

  it('mock() and clearMock()', ()=>{
    class Consumer {
      public getFoo() {
        return this.foo && this.foo.method();
      }

      public getBar() {
        return this.bar && this.bar.method();
      }

      @injector.Inject('productor')
      private foo: Productor;

      @injector.Inject('productor2')
      private bar: Productor2;
    }

    var consumer = new Consumer()

    @injector.Service
    class Productor {
      static service_name = 'productor';
      method() {
        return 'foo';
      }
    }

    @injector.Service
    class Productor2 {
      static service_name = 'productor2';
      method() {
        return 'bar';
      }
    }

    injector.createTestContext();

    injector.mock('productor', { method: ()=>'test_foo'});
    injector.mock('productor2', { method: ()=>'test_bar'})

    expect(consumer.getFoo()).toBe('test_foo');
    expect(consumer.getBar()).toBe('test_bar');

    injector.clearMocks();

    expect(consumer.getFoo()).toBe('foo');
    expect(consumer.getBar()).toBe('bar');
  });

});
