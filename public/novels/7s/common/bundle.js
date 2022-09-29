/*! Copyright © 2011 - 2022 miHoYo. All Rights Reserved */ !(function (e) {
  function t(t) {
    for (
      var r, o, u = t[0], s = t[1], c = t[2], f = 0, d = [];
      f < u.length;
      f++
    )
      (o = u[f]),
        Object.prototype.hasOwnProperty.call(i, o) && i[o] && d.push(i[o][0]),
        (i[o] = 0)
    for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r])
    for (l && l(t); d.length; ) d.shift()()
    return a.push.apply(a, c || []), n()
  }
  function n() {
    for (var e, t = 0; t < a.length; t++) {
      for (var n = a[t], r = !0, u = 1; u < n.length; u++) {
        var s = n[u]
        0 !== i[s] && (r = !1)
      }
      r && (a.splice(t--, 1), (e = o((o.s = n[0]))))
    }
    return e
  }
  var r = {},
    i = { 0: 0 },
    a = []
  function o(t) {
    if (r[t]) return r[t].exports
    var n = (r[t] = { i: t, l: !1, exports: {} })
    return e[t].call(n.exports, n, n.exports, o), (n.l = !0), n.exports
  }
  ;(o.m = e),
    (o.c = r),
    (o.d = function (e, t, n) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n })
    }),
    (o.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (o.t = function (e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var n = Object.create(null)
      if (
        (o.r(n),
        Object.defineProperty(n, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          o.d(
            n,
            r,
            function (t) {
              return e[t]
            }.bind(null, r)
          )
      return n
    }),
    (o.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return o.d(t, 'a', t), t
    }),
    (o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (o.p =
      'https://webstatic-sea.mihoyo.com/bh3/event/mihoyo-bh3-novel-7swords-ja-fe/')
  var u = (window.webpackJsonp = window.webpackJsonp || []),
    s = u.push.bind(u)
  ;(u.push = t), (u = u.slice())
  for (var c = 0; c < u.length; c++) t(u[c])
  var l = s
  a.push([242, 1]), n()
})({
  100: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      n(579),
      (t.default = {
        name: 'pager',
        props: {
          page: { type: Number, default: 1 },
          totalPage: { type: Number, default: 0 },
        },
        computed: {
          isFirstPage: function () {
            return 1 === this.page
          },
          isLastPage: function () {
            return this.page === this.totalPage
          },
        },
        methods: {
          prev: function (e) {
            if ((e.stopPropagation(), !this.isFirstPage)) {
              var t = Math.max(1, this.page - 1)
              this.$emit('update:page', t), this.$emit('prev', t)
            }
          },
          next: function (e) {
            if ((e.stopPropagation(), !this.isLastPage)) {
              var t = Math.min(this.totalPage, this.page + 1)
              this.$emit('update:page', t), this.$emit('next', t)
            }
          },
        },
      })
  },
  101: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(102),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
  102: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = function (e, t) {
        if (Array.isArray(e)) return e
        if (Symbol.iterator in Object(e))
          return (function (e, t) {
            var n = [],
              r = !0,
              i = !1,
              a = void 0
            try {
              for (
                var o, u = e[Symbol.iterator]();
                !(r = (o = u.next()).done) &&
                (n.push(o.value), !t || n.length !== t);
                r = !0
              );
            } catch (e) {
              ;(i = !0), (a = e)
            } finally {
              try {
                !r && u.return && u.return()
              } finally {
                if (i) throw a
              }
            }
            return n
          })(e, t)
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        )
      },
      i = o(n(157)),
      a = o(n(581))
    function o(e) {
      return e && e.__esModule ? e : { default: e }
    }
    n(582),
      (t.default = {
        name: 'chapter',
        components: { pager: i.default },
        props: {
          createGal: Function,
          chapter: {
            type: Object,
            default: function () {
              return {}
            },
          },
        },
        data: function () {
          return {
            list: _.orderBy(
              this.chapter.parts,
              function (e) {
                return Number(e.order)
              },
              'asc'
            ),
            currentScene: {},
            page: 1,
            pageSize: 5,
            isFirstPage: !0,
            isLastPage: !1,
          }
        },
        computed: {
          totalPage: function () {
            return Math.ceil(this.list.length / this.pageSize)
          },
        },
        mounted: function () {
          var e = this,
            t = r(this.list, 1)[0]
          ;(this.currentScene = void 0 === t ? {} : t),
            (this.scroll = new a.default(this.$refs.sceneList, {
              scrollX: !0,
              scrollY: !1,
              click: !0,
              tap: !0,
              bounceTime: 500,
            })),
            this.scroll.on('scrollEnd', function (t) {
              if (0 === t.x) e.page = 1
              else if (t.x === e.scroll.maxScrollX) e.page = e.totalPage
              else {
                var n =
                  e.$refs.sceneList.querySelector('.chapter__scene').offsetWidth
                e.page = Math.ceil(Math.ceil(-e.scroll.x / n) / e.pageSize) + 1
              }
            })
        },
        beforeDestroy: function () {
          this.scroll.destroy()
        },
        methods: {
          prev: function () {
            this.scrollTo(-1)
          },
          next: function () {
            this.scrollTo(1)
          },
          scrollTo: function (e) {
            var t =
                this.$refs.sceneList.querySelector(
                  '.chapter__scene'
                ).offsetWidth,
              n = this.scroll.x + t * this.pageSize * -e
            this.scroll.scrollTo(
              Math.min(Math.max(n, this.scroll.maxScrollX), 0),
              0,
              300
            )
          },
          onSelect: function (e, t) {
            this.currentScene = t
          },
          onRead: function () {
            this.currentScene.part_id &&
              this.createGal(this.chapter, this.currentScene.scene_id)
          },
        },
      })
  },
  103: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(104),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
  104: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = l(n(585)),
      i = l(n(586)),
      a = l(n(589)),
      o = l(n(231)),
      u =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        },
      s = function (e, t) {
        if (Array.isArray(e)) return e
        if (Symbol.iterator in Object(e))
          return (function (e, t) {
            var n = [],
              r = !0,
              i = !1,
              a = void 0
            try {
              for (
                var o, u = e[Symbol.iterator]();
                !(r = (o = u.next()).done) &&
                (n.push(o.value), !t || n.length !== t);
                r = !0
              );
            } catch (e) {
              ;(i = !0), (a = e)
            } finally {
              try {
                !r && u.return && u.return()
              } finally {
                if (i) throw a
              }
            }
            return n
          })(e, t)
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance'
        )
      },
      c = l(n(157))
    function l(e) {
      return e && e.__esModule ? e : { default: e }
    }
    n(593),
      (t.default = {
        name: 'archive',
        components: { pager: c.default },
        props: {
          createGal: Function,
          novelData: {
            type: Object,
            default: function () {
              return {}
            },
          },
        },
        data: function () {
          return { page: 1, pageSize: 5, list: [], current: {} }
        },
        computed: {
          charaStyle: function () {
            return this.current.img_urls && this.current.img_urls.length
              ? {
                  backgroundImage:
                    'url(' + s(this.current.img_urls, 1)[0] + ')',
                }
              : {}
          },
          currentList: function () {
            return (0, o.default)(
              this.list,
              (this.page - 1) * this.pageSize,
              this.page * this.pageSize
            )
          },
          totalPage: function () {
            return Math.ceil(this.list.length / this.pageSize)
          },
          hasEx: function () {
            var e = this
            if (this.current.chapter_id) {
              var t = (0, a.default)(this.novelData.chapters, function (t) {
                return t.id === e.current.chapter_id
              })
              return t && t.parts.length > 0
            }
            return !1
          },
        },
        created: function () {
          this.novelData.achievements = appendExtraAchievements(
            this.novelData.achievements
          )

          var e = []
          ;(0, i.default)(this.novelData.achievements, function (t) {
            var n = t.desc,
              i = (function (e, t) {
                var n = {}
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]))
                return n
              })(t, ['desc']),
              o = (0, a.default)(e, function (e) {
                return e.name === t.name
              })
            o && Number(o.weight) <= Number(t.weight)
              ? (0, r.default)(o, t, { id: o.id, desc: t.desc.split('\n') })
              : o || e.push(u({ desc: n.split('\n') }, i))
          }),
            (this.list = e),
            (this.current = this.list[0] || {})
        },
        methods: {
          onSelect: function (e) {
            ;(this.current = e), (this.$refs.intro.scrollTop = 0)
          },
          goToChapter: function () {
            var e = this
            if (this.current.chapter_id) {
              var t = (0, a.default)(this.novelData.chapters, function (t) {
                return t.id === e.current.chapter_id
              })
              this.createGal(t)
            }
          },
        },
      })
  },
  105: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(106),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
  106: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r,
      i = n(154),
      a = (r = i) && r.__esModule ? r : { default: r },
      o = n(38),
      u = n(155)
    n(595),
      (t.default = {
        name: 'cg-list',
        props: {
          createGal: Function,
          novelData: {
            type: Object,
            default: function () {
              return {}
            },
          },
        },
        mounted: function () {
          var e = this
          a.default.createCollection({
            container: 'cg',
            resource: o.memoryCache.get(u.CACHE_RESOURCE_XML),
            transition: 0,
            thumbSrc: function (e) {
              return e + '?x-oss-process=image/resize,s_270/interlace,1'
            },
            src: function (e) {
              return e + '?x-oss-process=image/interlace,1'
            },
            onClose: function () {
              e.$router.push('/')
            },
          })
        },
      })
  },
  107: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(108),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
  108: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }), n(604)
    var r = l(n(154)),
      i = l(n(605)),
      a = n(38),
      o = n(155),
      u = n(230),
      s = l(n(609)),
      c = l(n(610))
    function l(e) {
      return e && e.__esModule ? e : { default: e }
    }
    t.default = {
      name: 'app',
      data: function () {
        return {
          loading: !1,
          loadingProgress: 0,
          initialized: !1,
          resource: null,
          showGal: !1,
          gal: null,
          novelData: {},
          needReload: !1,
          showEndDialog: !1,
          showNextEpDialog: !1,
          nextEpText: '',
          scrollTimer: null,
          isInApp: this.$bbsApp.appVersion,
          isFullscreen: !1,
        }
      },
      beforeCreate: function () {
        '/' !== this.$route.path && this.$router.push('/')
      },
      created: function () {
        this.init()
      },
      mounted: function () {
        var e = this
        console.log('app.vue this.$MI18N', this.$MI18N),
          console.log('this.$bbsApp', this.$bbsApp),
          i.default.stopBgm()
        var t = new r.default.Sound()
        a.memoryCache.set(o.CACHE_SOUND_INST, t),
          t.init(),
          t.register('menu_bgm', s.default),
          window.addEventListener('touchend', function () {
            t.initialized ||
              ((t.initialized = !0),
              t.play('menu_bgm', r.default.VARS.SCRIPT_TYPES.BGM))
          }),
          window.addEventListener('click', function () {
            t.initialized ||
              ((t.initialized = !0),
              t.play('menu_bgm', r.default.VARS.SCRIPT_TYPES.BGM))
          }),
          window.addEventListener('resize', function () {
            clearTimeout(e.scrollTimer),
              (e.scrollTimer = setTimeout(function () {
                0 !==
                  (document.documentElement.scrollTop ||
                    window.pageYOffset ||
                    document.body.scrollTop) &&
                  ((document.documentElement.scrollTop = 0),
                  (document.body.scrollTop = 0))
              }, 50))
          })
        var n = void 0,
          u = void 0
        void 0 !== document.hidden
          ? ((n = 'hidden'), (u = 'visibilitychange'))
          : void 0 !== document.msHidden
          ? ((n = 'msHidden'), (u = 'msvisibilitychange'))
          : void 0 !== document.webkitHidden &&
            ((n = 'webkitHidden'), (u = 'webkitvisibilitychange')),
          window.addEventListener(u, function () {
            document[n]
              ? (e.gal && e.gal.mute(), t.mute())
              : (e.gal && e.gal.unmute(), t.unmute())
          })
      },
      methods: {
        init: function () {
          var e,
            t = this
          return ((e = regeneratorRuntime.mark(function e() {
            var n, r
            return regeneratorRuntime.wrap(
              function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (t.loading = !0),
                        (e.next = 3),
                        c.default.getData().catch(function () {
                          t.loading = !1
                        })
                      )
                    case 3:
                      if (!(n = e.sent)) {
                        e.next = 11
                        break
                      }
                      return (
                        (t.novelData = n),
                        (e.next = 8),
                        c.default.loadXML(n.xml_url)
                      )
                    case 8:
                      ;(r = e.sent),
                        a.memoryCache.set(o.CACHE_RESOURCE_XML, r),
                        (t.resource = r)
                    case 11:
                      ;(t.loading = !1), (t.initialized = !0)
                    case 13:
                    case 'end':
                      return e.stop()
                  }
              },
              e,
              t
            )
          })),
          function () {
            var t = e.apply(this, arguments)
            return new Promise(function (e, n) {
              return (function r(i, a) {
                try {
                  var o = t[i](a),
                    u = o.value
                } catch (e) {
                  return void n(e)
                }
                if (!o.done)
                  return Promise.resolve(u).then(
                    function (e) {
                      r('next', e)
                    },
                    function (e) {
                      r('throw', e)
                    }
                  )
                e(u)
              })('next')
            })
          })()
        },
        createGal: function (e, t, n, r, i) {
          var a = this
          e &&
            e.xml_url &&
            ((this.loading = !0),
            c.default.loadXML(e.xml_url).then(function (o) {
              a.renderGal(u.NOVEL_NAME, e.id, t, n, o, a.resource, r, i)
            }))
        },
        renderGal: function (e, t, n, i, u, s, l, f) {
          var d = this,
            p = a.memoryCache.get(o.CACHE_SOUND_INST),
            v = this,
            h = r.default.createAVG({
              stage: 'gal',
              sceneId: n,
              data: u,
              resource: s,
              saveDataName: 'gal_' + e,
              autoSave: !0,
              autoSaveDataName: 'gal_' + e,
              preload: {
                silent: !0,
                onStart: function () {
                  d.loading = !0
                },
                onProgress: function (e, t) {
                  d.loadingProgress = t
                },
                onComplete: function () {
                  ;(d.loading = !1),
                    (d.loadingProgress = 0),
                    p.stopBGM(),
                    (d.showGal = !0)
                },
              },
              customSaveData: function () {
                return { cid: t }
              },
              onLoadFail: function () {
                v.$toast({ content: i18n.loadFail })
              },
              beforeLoad: function (e) {
                if (e && e.cid !== t) {
                  h.destroy()
                  var n = _.find(d.novelData.chapters, function (t) {
                    return t.id === e.cid
                  })
                  return n
                    ? (d.createGal(n, e.sceneId, e.currentScriptId), !1)
                    : ((d.showGal = !1), !1)
                }
                return !0
              },
              calcPx: function (e) {
                return e / 100 + 'rem'
              },
              onEnd: function (e, n) {
                if (
                  ((d.loading = !1),
                  console.log('error', n),
                  console.log('script', e),
                  n && (!e || e.type !== r.default.VARS.SCRIPT_TYPES.EVENT))
                )
                  return (
                    h.destroy(),
                    d.closeGal(f),
                    void v.$toast({ content: i18n.noScene })
                  )
                var i = _.find(d.novelData.chapters, function (e) {
                  return e.id === t
                })
                if (i && (0 !== Number(i.type) || Number(i.order) >= 100))
                  return h.destroy(), void d.closeGal(f)
                var a = _.orderBy(
                    _.filter(d.novelData.chapters, function (e) {
                      return (
                        0 === Number(e.type) &&
                        e.parts.length &&
                        Number(e.order) < 100
                      )
                    }),
                    function (e) {
                      return Number(e.order)
                    },
                    'asc'
                  ),
                  o =
                    a[
                      _.findIndex(a, function (e) {
                        return e.id === t
                      }) + 1
                    ]
                if (o) {
                  h.destroy()
                  var u = _.head(
                    _.orderBy(
                      o.parts,
                      function (e) {
                        return Number(e.order)
                      },
                      'asc'
                    )
                  )
                  u ? d.createGal(o, u.scene_id) : d.closeGal(f)
                } else
                  1 !== Number(d.novelData.is_finished)
                    ? ('function' == typeof f && f(),
                      (d.nextEpText = i.tips),
                      (d.showEndDialog = !0))
                    : (h.destroy(), d.closeGal(f))
              },
              onClose: function () {
                d.closeGal(f)
              },
              onEvent: function (e, t) {
                if ('end' === e) {
                  return h.destroy(), d.closeGal(f), !1
                }
                if ('achievement' === e) {
                  handleAchievement(t)
                }
              },
            })
          l ? h.continue() : h.start(n, i), (this.gal = h)
        },
        onEnded: function () {
          var e = this
          this.gal && this.gal.destroy(),
            this.closeGal(),
            this.nextEpText &&
              this.$nextTick(function () {
                e.showNextEpDialog = !0
              })
        },
        onEndClick: function () {
          ;(this.showEndDialog = !1), (this.showGal = !1)
        },
        closeGal: function (e) {
          var t = this
          ;(this.gal = null),
            a.memoryCache
              .get(o.CACHE_SOUND_INST)
              .play('menu_bgm', r.default.VARS.SCRIPT_TYPES.BGM),
            'function' == typeof e && e(),
            (this.showGal = !1),
            this.cancelFullScreen(),
            this.needReload &&
              (c.default.getData().then(function (e) {
                t.novelData = e
              }),
              (this.needReload = !1))
        },
        setFullscreen: function () {
          ;(this.isFullscreen = !0), this.$bbsApp.setFullscreen()
        },
        cancelFullScreen: function () {
          ;(this.isFullscreen = !1), this.$bbsApp.showNavigationBar({})
        },
        toggleFullscreen: function () {
          this.isFullscreen ? this.cancelFullScreen() : this.setFullscreen()
        },
      },
    }
  },
  136: function (e) {
    e.exports = JSON.parse('{"router":"./lib/router/index.js"}')
  },
  137: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = n(138)
    t.default = {
      log: function () {
        var e
        ;(e = console)[r.Log].apply(e, arguments)
      },
      info: function () {
        var e
        ;(e = console)[r.Info].apply(e, arguments)
      },
      warn: function () {
        var e
        ;(e = console)[r.Warn].apply(e, arguments)
      },
      error: function () {
        var e
        ;(e = console)[r.Error].apply(e, arguments)
      },
    }
  },
  138: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    ;(t.Log = 'log'), (t.Info = 'info'), (t.Warn = 'warn'), (t.Error = 'error')
  },
  139: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = c(n(446)),
      i = c(n(220)),
      a =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        },
      o = c(n(152)),
      u = n(524),
      s = c(n(525))
    function c(e) {
      return e && e.__esModule ? e : { default: e }
    }
    function l(e, t, n) {
      var r = this,
        o = u.dealConfigsBeforeRequest
          ? u.dealConfigsBeforeRequest.bind(this)(e)
          : e,
        s = o.url,
        c = o.data,
        l = o.query,
        f = o.onSuccess,
        d = void 0 === f ? function () {} : f,
        p = o.onError,
        v = void 0 === p ? function () {} : p,
        h = (function (e, t) {
          var n = {}
          for (var r in e)
            t.indexOf(r) >= 0 ||
              (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]))
          return n
        })(o, ['url', 'data', 'query', 'onSuccess', 'onError']),
        g = [c, a({ params: l }, h)]
      return (
        'get' === n
          ? (g = [a({ params: c }, h)])
          : 'delete' === n && (g = [a({ params: l, data: c }, h)]),
        t[n]
          .apply(
            t,
            [s].concat(
              (function (e) {
                if (Array.isArray(e)) {
                  for (var t = 0, n = Array(e.length); t < e.length; t++)
                    n[t] = e[t]
                  return n
                }
                return Array.from(e)
              })(g)
            )
          )
          .then(
            function (t) {
              return u.requestComplete.bind(r)(t, e)
                ? null
                : (d.bind(r)((0, i.default)(t, 'data')), t)
            },
            function (t) {
              var n = (0, i.default)(t, 'response')
              return u.requestComplete.bind(r)(n, e, t)
                ? null
                : (v.bind(r)(n), Promise.reject(t))
            }
          )
      )
    }
    function f(e) {
      var t = this
      return {
        get: function (n) {
          return l.bind(t)(n, e, 'get')
        },
        post: function (n) {
          return l.bind(t)(n, e, 'post')
        },
        put: function (n) {
          return l.bind(t)(n, e, 'put')
        },
        delete: function (n) {
          return l.bind(t)(n, e, 'delete')
        },
      }
    }
    t.default = function (e) {
      var t = e
      ;(0, r.default)(o.default.defaults, s.default),
        Object.defineProperty(t.prototype, '$http', {
          get: function () {
            return f.bind(this)(o.default)
          },
        })
    }
  },
  155: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    ;(t.CACHE_RESOURCE_XML = 'RESOURCE_XML'),
      (t.CACHE_SOUND_INST = 'SOUND_INST')
  },
  157: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(166),
      i = n(99)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/components/pager/pager.vue'),
      (t.default = u.exports)
  },
  161: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n(
          'div',
          { staticClass: 'gal-main' },
          [
            n('router-view', {
              attrs: { createGal: e.createGal, 'novel-data': e.novelData },
            }),
            e._v(' '),
            n('div', {
              class: { 'gal--active': e.showGal },
              attrs: { id: 'gal' },
            }),
            e._v(' '),
            e.isInApp && e.showGal
              ? n('div', {
                  staticClass: 'gal-btn-fullscreen',
                  class: { 'gal-btn-fullscreen--active': e.isFullscreen },
                  on: { click: e.toggleFullscreen },
                })
              : e._e(),
            e._v(' '),
            e.loading
              ? n('div', { attrs: { id: 'loading' } }, [
                  n(
                    'div',
                    { staticClass: 'loading-spinner' },
                    [
                      e.initialized
                        ? [
                            n('p', [e._v(e._s(i18n.wifi))]),
                            e._v(' '),
                            n('span', [
                              e._v(
                                e._s(i18n.loading) +
                                  ' ' +
                                  e._s(
                                    e.loadingProgress
                                      ? e.loadingProgress + '%'
                                      : ''
                                  )
                              ),
                            ]),
                            e._v(' '),
                            n('p', [
                              e._v(
                                '\n          ' +
                                  e._s(i18n.fictional1) +
                                  '\n          '
                              ),
                              n('br'),
                              e._v(e._s(i18n.fictional2) + '\n        '),
                            ]),
                          ]
                        : n('p', [e._v(e._s(i18n.loading))]),
                    ],
                    2
                  ),
                ])
              : e._e(),
            e._v(' '),
            n(
              'transition',
              {
                attrs: { name: 'gal-popup' },
                on: { 'after-leave': e.onEnded },
              },
              [
                e.showEndDialog
                  ? n('div', { staticClass: 'gal-popup gal-popup-end' }, [
                      n('div', { staticClass: 'gal-popup__content' }, [
                        n('div', {
                          staticClass: 'gal-popup__confirm',
                          on: { click: e.onEndClick },
                        }),
                      ]),
                    ])
                  : e._e(),
              ]
            ),
            e._v(' '),
            n('transition', { attrs: { name: 'gal-popup' } }, [
              e.showNextEpDialog
                ? n('div', { staticClass: 'gal-popup gal-popup-next' }, [
                    n('div', { staticClass: 'gal-popup__content' }, [
                      n('div', { staticClass: 'gal-popup__textwrp' }, [
                        n('div', { staticClass: 'gal-popup__text' }, [
                          e._v(e._s(e.nextEpText)),
                        ]),
                      ]),
                      e._v(' '),
                      n('div', {
                        staticClass: 'gal-popup__confirm',
                        on: {
                          click: function (t) {
                            e.showNextEpDialog = !1
                          },
                        },
                      }),
                    ]),
                  ])
                : e._e(),
            ]),
          ],
          1
        )
      },
      i = []
    r._withStripped = !0
  },
  162: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n('div', { staticClass: 'home' }, [
          e.showClose
            ? n('div', {
                staticClass: 'avg-button avg-button-back',
                on: { click: e.closePage },
              })
            : e._e(),
          e._v(' '),
          n('div', { staticClass: 'main-menu' }, [
            n(
              'div',
              { staticClass: 'main-menu__item', on: { click: e.start } },
              [n('span', [e._v(e._s(i18n.start))])]
            ),
            e._v(' '),
            e.hasSaveData
              ? n(
                  'div',
                  {
                    staticClass: 'main-menu__item',
                    on: { click: e.continueRead },
                  },
                  [n('span', [e._v(e._s(i18n.continue))])]
                )
              : e._e(),
            e._v(' '),
            n(
              'div',
              { staticClass: 'main-menu__item' },
              [
                n('router-link', { attrs: { to: '/chapterList' } }, [
                  e._v(e._s(i18n.chapters)),
                ]),
              ],
              1
            ),
            e._v(' '),
            n(
              'div',
              { staticClass: 'main-menu__item' },
              [
                n('router-link', { attrs: { to: '/archive' } }, [
                  e._v(e._s(i18n.archive)),
                ]),
              ],
              1
            ),
            e._v(' '),
            n(
              'div',
              { staticClass: 'main-menu__item' },
              [
                n('router-link', { attrs: { to: '/cg' } }, [
                  e._v(e._s(i18n.gallery)),
                ]),
              ],
              1
            ),
          ]),
        ])
      },
      i = []
    r._withStripped = !0
  },
  163: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n(
          'div',
          { staticClass: 'chapter-list' },
          [
            n('router-link', {
              staticClass: 'avg-button avg-button-back',
              attrs: { to: '/' },
            }),
            e._v(' '),
            n(
              'div',
              { staticClass: 'chapter-list__content' },
              e._l(e.currentList, function (t) {
                return n('chapter', {
                  key: t.id,
                  attrs: { chapter: t, createGal: e.createGal },
                })
              }),
              1
            ),
            e._v(' '),
            n('pager', {
              staticClass: 'chapter-list__pager',
              attrs: { page: e.page, 'total-page': e.totalPage },
              on: {
                'update:page': function (t) {
                  e.page = t
                },
              },
            }),
          ],
          1
        )
      },
      i = []
    r._withStripped = !0
  },
  164: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n(
          'div',
          { staticClass: 'archive' },
          [
            n('router-link', {
              staticClass: 'avg-button archive__back',
              attrs: { to: '/' },
            }),
            e._v(' '),
            n(
              'div',
              { staticClass: 'archive__menu-wrp' },
              [
                n(
                  'ul',
                  { staticClass: 'archive__menu' },
                  e._l(e.currentList, function (t) {
                    return n(
                      'li',
                      {
                        key: t.id,
                        staticClass: 'archive__menu-item',
                        class: {
                          'archive__menu-item--selected':
                            e.current && t.id == e.current.id,
                        },
                        on: {
                          click: function (n) {
                            return e.onSelect(t)
                          },
                        },
                      },
                      [e._v(e._s(t.name))]
                    )
                  }),
                  0
                ),
                e._v(' '),
                n('pager', {
                  attrs: { page: e.page, 'total-page': e.totalPage },
                  on: {
                    'update:page': function (t) {
                      e.page = t
                    },
                  },
                }),
              ],
              1
            ),
            e._v(' '),
            n('div', { staticClass: 'archive__content' }, [
              n('div', { staticClass: 'archive__chara', style: e.charaStyle }),
              e._v(' '),
              n('div', { ref: 'intro', staticClass: 'archive__intro' }, [
                n(
                  'div',
                  { staticClass: 'archive__intro-inner' },
                  e._l(e.current.desc, function (t, r) {
                    return n('p', { key: r, staticClass: 'archive__text' }, [
                      e._v(e._s(t)),
                    ])
                  }),
                  0
                ),
              ]),
              e._v(' '),
              e.hasEx
                ? n('div', {
                    staticClass: 'archive__ex',
                    on: { click: e.goToChapter },
                  })
                : e._e(),
            ]),
          ],
          1
        )
      },
      i = []
    r._withStripped = !0
  },
  165: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this.$createElement
        this._self._c
        return this._m(0)
      },
      i = [
        function () {
          var e = this.$createElement,
            t = this._self._c || e
          return t('div', { staticClass: 'cg-list' }, [
            t('div', { attrs: { id: 'cg' } }),
          ])
        },
      ]
    r._withStripped = !0
  },
  166: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this.$createElement,
          t = this._self._c || e
        return this.totalPage > 1
          ? t('div', { staticClass: 'pager' }, [
              t('div', {
                staticClass: 'pager__btn pager__prev',
                class: { 'pager__btn--disabled': this.isFirstPage },
                on: { click: this.prev },
              }),
              this._v(' '),
              t('div', {
                staticClass: 'pager__btn pager__next',
                class: { 'pager__btn--disabled': this.isLastPage },
                on: { click: this.next },
              }),
            ])
          : this._e()
      },
      i = []
    r._withStripped = !0
  },
  167: function (e, t, n) {
    'use strict'
    n.d(t, 'a', function () {
      return r
    }),
      n.d(t, 'b', function () {
        return i
      })
    var r = function () {
        var e = this,
          t = e.$createElement,
          n = e._self._c || t
        return n('div', { staticClass: 'chapter' }, [
          n('span', { staticClass: 'chapter__title' }, [
            e._v(e._s(e.chapter.name)),
          ]),
          e._v(' '),
          n(
            'div',
            { staticClass: 'chapter__wrapper' },
            [
              n(
                'div',
                { ref: 'sceneList', staticClass: 'chapter__scene-list' },
                [
                  n(
                    'ul',
                    e._l(e.list, function (t, r) {
                      return n(
                        'li',
                        {
                          key: t.part_id,
                          staticClass: 'chapter__scene',
                          class: {
                            'chapter__scene--selected':
                              e.currentScene &&
                              t.part_id == e.currentScene.part_id,
                          },
                          on: {
                            click: function (n) {
                              return e.onSelect(n, t, r)
                            },
                          },
                        },
                        [n('span', [e._v(e._s(t.name))])]
                      )
                    }),
                    0
                  ),
                ]
              ),
              e._v(' '),
              e.totalPage > 1
                ? n('pager', {
                    staticClass: 'chapter__pager',
                    attrs: { page: e.page, 'total-page': e.totalPage },
                    on: {
                      'update:page': function (t) {
                        e.page = t
                      },
                      prev: e.prev,
                      next: e.next,
                    },
                  })
                : e._e(),
            ],
            1
          ),
          e._v(' '),
          n('div', { staticClass: 'chapter__desc' }, [
            e._v(e._s(e.currentScene.intro)),
          ]),
          e._v(' '),
          e.currentScene.part_id
            ? n('div', {
                staticClass: 'avg-button chapter__read',
                on: { click: e.onRead },
              })
            : e._e(),
        ])
      },
      i = []
    r._withStripped = !0
  },
  228: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function (e, t, n) {
        if ('number' != typeof e) return e
        switch (t) {
          case 'split':
            return (function (e) {
              var t = [],
                n = e,
                r = ''
              for (; n > 1e3; ) t.push(n % 1e3), (n = Math.floor(n / 1e3))
              t.push(n)
              for (; t.length > 0; ) r += t.pop() + ','
              return r.substr(0, r.length - 1)
            })(e)
          case 'byte':
            return (function (e) {
              var t = 0
              if (e >= 1e3 && e < 1e6)
                return {
                  value: (t = parseFloat(e / 1024)),
                  unit: 'KB',
                  text: t + 'KB',
                }
              if (e >= 1e6 && e < 1e9)
                return {
                  value: (t = parseFloat(e / 1048576)),
                  unit: 'MB',
                  text: t + 'MB',
                }
              if (e >= 1e9)
                return {
                  value: (t = parseFloat(e / 1073741824)),
                  unit: 'GB',
                  text: t + 'GB',
                }
              return { value: e, unit: 'B', text: e + 'B' }
            })(e)
          case 'percent':
            return (function (e, t) {
              var n = Math.round(100 * e)
              'fill' === t && n < 10 && (n = '0' + n)
              return n + '%'
            })(e, n)
          case 'time':
            return (function (e) {
              var t = e / 1e3 / 60 / 60,
                n = Math.floor(t),
                r = 60 * (t - n),
                i = Math.floor(r),
                a = 60 * (r - i),
                o = Math.floor(a)
              return {
                hour: n,
                minute: i,
                second: o,
                millisecond: 1e3 * (a - o),
              }
            })(e)
          default:
            return e >= 1e3 && e < 1e6
              ? parseFloat((e / 1e3).toFixed(n || 2)) + 'K'
              : e >= 1e6 || e <= -1e6
              ? parseFloat((e / 1e6).toFixed(n || 2)) + 'M'
              : e
        }
      })
  },
  230: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    t.NOVEL_NAME = '7swords'
  },
  238: function (e, t, n) {
    'use strict'
    e.exports = function (e) {
      return {
        '@configs': e('src/configs'),
        '@framework': e('src/framework/index.js'),
        '@httpService': e('src/framework/services/httpService.js'),
        '@cacheService': e('src/framework/services/cacheService.js'),
        '@routerService': e('src/framework/services/routerService.js'),
        '@numberFormat': e('src/framework/components/utils/numberFormat.js'),
        '@logger': e('src/framework/components/utils/logger.js'),
        '@libRegister': e('src/framework/libRegister.json'),
      }
    }
  },
  242: function (e, t, n) {
    'use strict'
    var r =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        },
      i = g(n(243)),
      a = g(n(58)),
      o = n(38),
      u = g(n(597)),
      s = n(91)
    n(598)
    var c,
      l,
      f = g(n(603)),
      d = g(n(631)),
      p = g(n(632)),
      v = g(n(635)),
      h = n(636)
    function g(e) {
      return e && e.__esModule ? e : { default: e }
    }
    n(650),
      (0, v.default)(i.default),
      (0, p.default)(i.default),
      (0, d.default)(i.default),
      ((c = regeneratorRuntime.mark(function e() {
        return regeneratorRuntime.wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.prev = 1),
                    (e.next = 5),
                    (0, h.asyncRegisterMi18n)(
                      i.default,
                      'm06101747371151',
                      'bh3_jp',
                      s.environment,
                      'ja-jp'
                    ).catch(function () {})
                  )
                case 5:
                  e.next = 10
                  break
                case 7:
                  ;(e.prev = 7),
                    (e.t0 = e.catch(1)),
                    console.log('initMi18n e', e.t0)
                case 10:
                case 'end':
                  return e.stop()
              }
          },
          e,
          void 0,
          [[1, 7]]
        )
      })),
      (l = function () {
        var e = c.apply(this, arguments)
        return new Promise(function (t, n) {
          return (function r(i, a) {
            try {
              var o = e[i](a),
                u = o.value
            } catch (e) {
              return void n(e)
            }
            if (!o.done)
              return Promise.resolve(u).then(
                function (e) {
                  r('next', e)
                },
                function (e) {
                  r('throw', e)
                }
              )
            t(u)
          })('next')
        })
      }),
      function () {
        return l.apply(this, arguments)
      })()
        .then(function () {
          return (0, a.default)(i.default)
        })
        .then(function (e) {
          var t = new i.default(
            r(
              {
                el: '#content',
                template: '<app />',
                components: { app: f.default },
              },
              e
            )
          )
          o.memoryCache.set('vueItem', t),
            i.default.use(u.default, { siteId: '1278205898', router: e.router })
        })
  },
  243: function (e, t) {
    e.exports = Vue
  },
  38: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.setLocalStorageCache = function (e, t) {
        var n = window.localStorage,
          r = JSON.stringify({ timestamp: new Date().getTime(), value: t })
        n.setItem(e, r)
      }),
      (t.getLocalStorageCache = function (e) {
        var t = window.localStorage.getItem(e)
        if (null == t) return null
        return JSON.parse(t).value
      }),
      (t.removeLocalStorageCache = function (e) {
        window.localStorage.removeItem(e)
      }),
      (t.getLocalStorageInfo = function (e) {
        var t = window.localStorage.getItem(e)
        if (void 0 === t) return
        return JSON.parse(t)
      })
    var r
    t.memoryCache =
      ((r = {}),
      {
        set: function (e, t) {
          r[e] = { timestamp: Date.now(), value: t }
        },
        get: function (e) {
          return r[e] ? r[e].value : null
        },
        remove: function (e) {
          void 0 !== e && delete r[e]
        },
        getInfo: function (e) {
          return r[e]
        },
      })
  },
  524: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.dealConfigsBeforeRequest = function (e) {
        return e
      }),
      (t.requestComplete = function (e) {
        'request' === e || !e || e.status
        return !1
      })
  },
  525: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = n(91)
    t.default = {
      baseURL:
        'https://webstatic-sea.mihoyo.com/bh3/event/mihoyo-bh3-novel-7swords-ja-fe/',
      withCredentials: !0,
    }
  },
  526: function (e, t, n) {
    var r = {
      '.': 58,
      './': 58,
      './components/utils/logger': 137,
      './components/utils/logger.js': 137,
      './components/utils/loggerConfigs': 138,
      './components/utils/loggerConfigs.js': 138,
      './components/utils/numberFormat': 228,
      './components/utils/numberFormat.js': 228,
      './index': 58,
      './index.js': 58,
      './lib/router': 92,
      './lib/router/': 92,
      './lib/router/index': 92,
      './lib/router/index.js': 92,
      './libRegister': 136,
      './libRegister.json': 136,
      './services/cacheService': 38,
      './services/cacheService.js': 38,
      './services/httpService': 139,
      './services/httpService.js': 139,
      './webpackConfigs/utilWebpackAlias': 238,
      './webpackConfigs/utilWebpackAlias.js': 238,
    }
    function i(e) {
      var t = a(e)
      return n(t)
    }
    function a(e) {
      if (!n.o(r, e)) {
        var t = new Error("Cannot find module '" + e + "'")
        throw ((t.code = 'MODULE_NOT_FOUND'), t)
      }
      return r[e]
    }
    ;(i.keys = function () {
      return Object.keys(r)
    }),
      (i.resolve = a),
      (e.exports = i),
      (i.id = 526)
  },
  528: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = u(n(529)),
      i = u(n(531)),
      a = u(n(584)),
      o = u(n(594))
    function u(e) {
      return e && e.__esModule ? e : { default: e }
    }
    var s = [
      { path: '/', name: 'home', component: r.default },
      { path: '/chapterList', name: 'chapterList', component: i.default },
      { path: '/archive', name: 'archive', component: a.default },
      { path: '/cg', name: 'cg', component: o.default },
    ]
    t.default = s
  },
  529: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(162),
      i = n(95)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/main/home/home.vue'), (t.default = u.exports)
  },
  530: function (e, t, n) {},
  531: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(163),
      i = n(97)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/main/chapterList/chapterList.vue'),
      (t.default = u.exports)
  },
  579: function (e, t, n) {},
  58: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }), n(244)
    var r,
      i,
      a = s(n(136)),
      o = s(n(137)),
      u = s(n(139))
    function s(e) {
      return e && e.__esModule ? e : { default: e }
    }
    t.default =
      ((r = regeneratorRuntime.mark(function e(t) {
        var r, i, s, c, l
        return regeneratorRuntime.wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  ;(0, u.default)(t), (r = [])
                  try {
                    for (i = Object.keys(a.default), s = 0; s < i.length; s++)
                      (c = i[s]),
                        (l = n(526)('' + a.default[c]).default),
                        r.push(l(t))
                  } catch (e) {
                    o.default.error(e)
                  }
                  return e.abrupt(
                    'return',
                    Object.assign.apply(Object, [{}].concat(r))
                  )
                case 4:
                case 'end':
                  return e.stop()
              }
          },
          e,
          this
        )
      })),
      (i = function () {
        var e = r.apply(this, arguments)
        return new Promise(function (t, n) {
          return (function r(i, a) {
            try {
              var o = e[i](a),
                u = o.value
            } catch (e) {
              return void n(e)
            }
            if (!o.done)
              return Promise.resolve(u).then(
                function (e) {
                  r('next', e)
                },
                function (e) {
                  r('throw', e)
                }
              )
            t(u)
          })('next')
        })
      }),
      function (e) {
        return i.apply(this, arguments)
      })
  },
  580: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(167),
      i = n(101)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/components/chapter/chapter.vue'),
      (t.default = u.exports)
  },
  582: function (e, t, n) {},
  583: function (e, t, n) {},
  584: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(164),
      i = n(103)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/main/archive/archive.vue'),
      (t.default = u.exports)
  },
  593: function (e, t, n) {},
  594: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(165),
      i = n(105)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/main/cg/cg.vue'), (t.default = u.exports)
  },
  595: function (e, t, n) {},
  596: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.beforeRouterUpdate = function (e, t, n) {
        var r = this.prototype.$MI18N
        ;(document.title = (r && r.WORD && r.WORD.title) || document.title),
          0 === e.matched.length ? (t.path ? n(!1) : n('/')) : n()
      }),
      (t.afterRouterUpdate = function (e, t) {})
  },
  598: function (e, t, n) {
    'use strict'
    var r = u(n(599)),
      i = u(n(600)),
      a = u(n(601)),
      o = u(n(602))
    function u(e) {
      return e && e.__esModule ? e : { default: e }
    }
    r.default.attach(document.body),
      (0, i.default)(
        Object.assign({
          widthParam: 1920,
          heightParam: 1080,
          callback: function () {
            document.getElementById('frame').style.visibility = 'visible'
          },
        })
      ),
      o.default.init({
        mode: 'landscape',
        bgColor: '#ffffff',
        pic: 'http://cdn.houkai3rd.com/event_bh3_com/avg-anti-entropy/static_JP/resources/common/horizon_hint.png',
      }),
      a.default.init()
    var s = document.getElementById('vconsole')
    window.location.search.indexOf('debug=1') > -1 ||
    (-1 === window.location.pathname.indexOf('event_preview') &&
      window.location.host.indexOf('-test') > -1)
      ? (s.addEventListener('load', function () {
          window.vconsole = new window.VConsole()
        }),
        s.setAttribute('src', s.getAttribute('data-src')))
      : s.parentNode.removeChild(s)
  },
  603: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(161),
      i = n(107)
    for (var a in i)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return i[e]
          })
        })(a)
    var o = n(11),
      u = Object(o.a)(i.default, r.a, r.b, !1, null, null, null)
    ;(u.options.__file = 'src/app.vue'), (t.default = u.exports)
  },
  609: function (e, t, n) {
    e.exports = n.p + 'medias/bgm.f512dc75.mp3'
  },
  610: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r =
        Object.assign ||
        function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        },
      i = n(611),
      a = c(n(152)),
      o = n(38),
      u = n(91),
      s = c(n(239))
    function c(e) {
      return e && e.__esModule ? e : { default: e }
    }
    function l() {
      return s.default.parse(window.location.search.replace(/\?/, ''))
    }
    t.default = {
      getData: function () {
        var e = l(),
          t = e.isPreview,
          n = void 0 === t ? ('prerelease' === u.environment ? 1 : void 0) : t,
          a = e.isPublish,
          o = void 0 === a ? ('prerelease' === u.environment ? 1 : void 0) : a,
          s = (function (e, t) {
            var n = {}
            for (var r in e)
              t.indexOf(r) >= 0 ||
                (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]))
            return n
          })(e, ['isPreview', 'isPublish'])
        return s.auth_key || s.bind_uid
          ? (0, i.get)(
              '/api/index.json',
              r({}, s, { isPreview: n, isPublish: o })
            )
          : (0, i.get)('/api/index.json', {
              isPreview: n,
              isPublish: o,
            })
      },
      postAchievement: function (e) {
        var t = l(),
          n = void 0
        return (
          (n =
            t.auth_key || t.bind_uid
              ? 'achievement?' + s.default.stringify(t)
              : 'achievement'),
          (0, i.post)(n, { achievement_key: e })
        )
      },
      loadXML: function (e) {
        var t = void 0
        return (
          (t = 'string' == typeof e ? [e] : e),
          a.default
            .all(
              t.map(function (e) {
                return (function (e) {
                  return e
                    ? o.memoryCache.get(e)
                      ? o.memoryCache.get(e)
                      : a.default
                          .get(e + '?t=' + Date.now(), {
                            baseURL: '',
                            withCredentials: !1,
                          })
                          .then(function (t) {
                            return o.memoryCache.set(e, t.data), t.data
                          })
                          .catch(function () {
                            return ''
                          })
                    : ''
                })(e)
              })
            )
            .then(
              a.default.spread(function () {
                for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
                  t[n] = arguments[n]
                return t.length > 1 ? t : t[0]
              })
            )
        )
      },
    }
  },
  629: function (e, t) {},
  631: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = function (e) {
        e.filter('filterA', function (e) {
          return e || e.toLowerCase()
        }),
          e.filter('filterB', function (e) {
            return e || e.toUpperCase()
          })
      })
  },
  632: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = a(n(633)),
      i = a(n(634))
    function a(e) {
      return e && e.__esModule ? e : { default: e }
    }
    t.default = function (e) {
      e.use(r.default, { schemaName: 'hoyolab', forceRepaint: !0 }),
        e.use(i.default)
    }
  },
  635: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = {
      install: function (e) {
        var t = new e({})
        ;(e.prototype.$gemit = t.$emit.bind(t)),
          (e.prototype.$gon = t.$on.bind(t)),
          (e.prototype.$gonce = t.$once.bind(t)),
          (e.prototype.$goff = t.$off.bind(t))
      },
    }
    t.default = function (e) {
      e.use(r)
    }
  },
  636: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.asyncRegisterMi18n = void 0)
    var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function (e) {
              return typeof e
            }
          : function (e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e
            },
      i = f(n(637)),
      a = f(n(638)),
      o = f(n(643)),
      u = f(n(644)),
      s = f(n(645)),
      c = f(n(647)),
      l = f(n(649))
    function f(e) {
      return e && e.__esModule ? e : { default: e }
    }
    function d(e) {
      return function () {
        var t = e.apply(this, arguments)
        return new Promise(function (e, n) {
          return (function r(i, a) {
            try {
              var o = t[i](a),
                u = o.value
            } catch (e) {
              return void n(e)
            }
            if (!o.done)
              return Promise.resolve(u).then(
                function (e) {
                  r('next', e)
                },
                function (e) {
                  r('throw', e)
                }
              )
            e(u)
          })('next')
        })
      }
    }
    var p = 'undefined' != typeof window,
      v = function (e) {
        var t = 'prd'
        return (
          /(development|test)/.test(e)
            ? (t = 'test')
            : /(prerelease|pre)/i.test(e)
            ? (t = 'pre')
            : p &&
              /webstatic-sea/gi.test(window.location.hostname) &&
              (t = 'sea'),
          t
        )
      },
      h =
        p && /game_biz=/gi.test(window.location.search)
          ? window.location.search
              .match(/game_biz=[a-z0-9_]+/gi)[0]
              .replace('game_biz=', '')
          : 'global',
      g = function () {
        var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ''
        return e.indexOf('_') > -1 ? e.split('_')[1] : e
      },
      _ = function (e, t, n) {
        return 'object' === r(e[t]) && 'object' === r(e[t][n]) ? e[t][n] : {}
      }
    function m(e, t, n) {
      var r = e
      return (
        n instanceof Function
          ? (r = n(r))
          : n instanceof Array && (n.includes(r) || (r = t)),
        r
      )
    }
    var b,
      y = {
        install: function (e) {
          return // Block unnecessary i18n installation
          var t = this,
            n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {}
          return d(
            regeneratorRuntime.mark(function r() {
              var f,
                h,
                b,
                y,
                w,
                S,
                x,
                O,
                C,
                M,
                P,
                j,
                A,
                E,
                D,
                N,
                R,
                L,
                k,
                I,
                T,
                G
              return regeneratorRuntime.wrap(
                function (t) {
                  for (;;)
                    switch ((t.prev = t.next)) {
                      case 0:
                        if (
                          ((f = n.uniqueID),
                          (h = n.mi18nGameBiz),
                          (b = n.appEnv),
                          (y = n.initLang),
                          (w = n.initGameBiz),
                          (S = n.configs),
                          (x = void 0 === S ? {} : S),
                          (O = n.async),
                          (C = void 0 !== O && O),
                          (M = x.cacheTime),
                          (P = void 0 === M ? 5e3 : M),
                          (j = x.cookieDomain),
                          (A = void 0 === j ? '.mihoyo.com' : j),
                          (E = x.maxAge),
                          (D = void 0 === E ? 31536e3 : E),
                          (N = x.langLimit),
                          (R = x.defaultLang),
                          (L = void 0 === R ? 'en-us' : R),
                          (k = v(b)),
                          (I = g(w)),
                          '' ===
                            (T = m(
                              (T = y
                                ? a.default.getAppLang(y)
                                : p
                                ? a.default.getAppLang()
                                : ''),
                              L,
                              N
                            )))
                        ) {
                          t.next = 13
                          break
                        }
                        if (!C) {
                          t.next = 12
                          break
                        }
                        return (
                          (t.next = 10),
                          a.default
                            .asyncInit(f, h, T, k, P)
                            .catch(function () {})
                        )
                      case 10:
                        t.next = 13
                        break
                      case 12:
                        a.default.init(f, h, T, k, P)
                      case 13:
                        p &&
                          o.default.set('mi18nLang', T, {
                            domain: A,
                            path: '/',
                            'max-age': '' + D,
                          }),
                          (G = new e({
                            data: {
                              GAME_BIZ: w,
                              LANG: T,
                              WORD:
                                ('' !== T && a.default.getLocaleText()) || {},
                              TEXT: _(u.default, I, T),
                              IMAGE: _(s.default, I, T),
                              MEDIA: _(c.default, I, T),
                              STYLE: l.default[T],
                              IS_ASYNC_MI18N: C,
                            },
                            watch: {
                              STYLE: function () {
                                this.renderStyle(this.STYLE)
                              },
                            },
                            created: function () {
                              this.renderStyle(this.STYLE)
                            },
                            methods: {
                              renderStyle: function (e) {
                                ;(0, i.default)(e, { id: 'Mi18nStylesTag' })
                              },
                              getLangList: function () {
                                return a.default.getLangList()
                              },
                              setLang: function (e) {
                                var t = this,
                                  n =
                                    arguments.length > 1 &&
                                    void 0 !== arguments[1]
                                      ? arguments[1]
                                      : this.GAME_BIZ
                                return d(
                                  regeneratorRuntime.mark(function r() {
                                    var i, d, v
                                    return regeneratorRuntime.wrap(
                                      function (r) {
                                        for (;;)
                                          switch ((r.prev = r.next)) {
                                            case 0:
                                              if (
                                                ((i = m(e, L, N)),
                                                (d = g(n)),
                                                (v = a.default.getAppLang(i)),
                                                d === t.GAME_BIZ &&
                                                  v === t.LANG)
                                              ) {
                                                r.next = 17
                                                break
                                              }
                                              if (!t.IS_ASYNC_MI18N) {
                                                r.next = 9
                                                break
                                              }
                                              return (
                                                (r.next = 7),
                                                a.default
                                                  .asyncInit(f, h, v, k)
                                                  .catch(function () {})
                                              )
                                            case 7:
                                              r.next = 10
                                              break
                                            case 9:
                                              a.default.init(f, h, v, k)
                                            case 10:
                                              ;(t.LANG = i),
                                                (t.GAME_BIZ = n),
                                                (t.WORD =
                                                  a.default.getLocaleText() ||
                                                  {}),
                                                (t.TEXT = _(u.default, d, v)),
                                                (t.IMAGE = _(s.default, d, v)),
                                                (t.MEDIA = _(c.default, d, v)),
                                                (t.STYLE = l.default[v])
                                            case 17:
                                              p
                                                ? o.default.set(
                                                    'mi18nLang',
                                                    i,
                                                    {
                                                      domain: A,
                                                      path: '/',
                                                      'max-age': '' + D,
                                                    }
                                                  )
                                                : t.parentThis.$cookie.set(
                                                    'mi18nLang',
                                                    i,
                                                    {
                                                      domain: A,
                                                      path: '/',
                                                      maxAge: '' + D,
                                                    }
                                                  )
                                            case 18:
                                            case 'end':
                                              return r.stop()
                                          }
                                      },
                                      r,
                                      t
                                    )
                                  })
                                )()
                              },
                              getLocaleText: function (e) {
                                var t =
                                  arguments.length > 1 &&
                                  void 0 !== arguments[1] &&
                                  arguments[1]
                                return (
                                  a.default.getLocaleText(
                                    e,
                                    t ? this.TEXT : null
                                  ) || {}
                                )
                              },
                            },
                          })),
                          Object.defineProperty(e.prototype, '$MI18N', {
                            configurable: !0,
                            get: function () {
                              if (this !== e.prototype && !p) {
                                G.parentThis = this
                                var t = this.$cookie.get('mi18nLang') || y
                                t = m(t, L, N)
                                var n = a.default.getAppLang(t)
                                G.LANG !== n && G.setLang(n)
                              }
                              return G
                            },
                          })
                      case 16:
                      case 'end':
                        return t.stop()
                    }
                },
                r,
                t
              )
            })
          )()
        },
      }
    t.asyncRegisterMi18n =
      ((b = d(
        regeneratorRuntime.mark(function e(t, n, r) {
          var i =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 'production',
            a =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : 'ja-jp',
            o =
              arguments.length > 5 && void 0 !== arguments[5]
                ? arguments[5]
                : h,
            u = arguments[6],
            s =
              !(arguments.length > 7 && void 0 !== arguments[7]) || arguments[7]
          return regeneratorRuntime.wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (e.next = 2),
                      y.install(t, {
                        uniqueID: n,
                        mi18nGameBiz: r,
                        appEnv: i,
                        initLang: a,
                        initGameBiz: o,
                        configs: u,
                        async: s,
                      })
                    )
                  case 2:
                  case 'end':
                    return e.stop()
                }
            },
            e,
            void 0
          )
        })
      )),
      function (e, t, n) {
        return b.apply(this, arguments)
      })
    t.default = function (e, t, n) {
      var r =
          arguments.length > 3 && void 0 !== arguments[3]
            ? arguments[3]
            : 'production',
        i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : '',
        a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : h,
        o = arguments[6],
        u = arguments.length > 7 && void 0 !== arguments[7] && arguments[7]
      e.use(y, {
        uniqueID: t,
        mi18nGameBiz: n,
        appEnv: r,
        initLang: i,
        initGameBiz: a,
        configs: o,
        async: u,
      })
    }
  },
  644: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = {
        global: {
          'zh-cn': {
            lang: '中文（简体）',
            role: { name: '测试带目录层级的json配置' },
            time: {
              description: '一些跟语言有"关联的数值内容也可以配置在这里',
            },
          },
        },
      })
  },
  645: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = { global: { 'zh-cn': { demo: n(646) } } })
  },
  646: function (e, t) {
    e.exports =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAA+BAMAAACb/5e8AAAAHlBMVEVHcEyETB/LkFD////eqmilbDaVXCuIUCLDiEqyeT+1AaHdAAAAAXRSTlMAQObYZgAAAc5JREFUWMPt2L1ugzAQAOA8Qh1UmEEFNSPiBVIpLwBD1ZVIfQC2ZCxSlDlZeN3aPv/xY5SYc6VK3IAiEj7QYZ/P2RAf8bKB+L/4wUfsfeIf4tlXfBJPfMSb4Ff8Gfz9k3y38PFSq4/P8AfKW77s6CQ+MxfirO9pRPjlhO8aem1UKyZq9T2NiO4u+HVYiip48GZw+uSCl2RSSYenX+1Zj604TUihhKCQSjbEQxeciTl3eUglpvc0gv7CFS8krRUcnKXFG14yJQ9ETghuWjqedMi7MSw4rt+zG87Hc0EM/ISHp/LyQo6WLR6ezeIi4a44vDjfOM+5NzyYxPVYWoRTgCNHPDwjeoYSPlkqPDwlUhHvUywWKDibRKDAw8u6jYInN6VACRHrGcpoAYVfDXhv+i/Fb1D+cpnzXuFaiO8aeHI9Q0M8/CpGSyCKAFVatMJVcjxXB9lboOA1pJwe+SrNDkc03Fj2ofKK4oKyzNV9RBUXFJytz3nQUyo0/Ic3XIGptNjL3Khvw1ygRx0nSq84apVRu1zW5DfjLv/x/nwOZ1uiSz3en3RqDwN7j7sLntj3YXL3Re89sydywR+OmGx97UNX3PoyNytuw9d/RP8c/wUkxPrAS5xS8wAAAABJRU5ErkJggg=='
  },
  647: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = { global: { 'zh-cn': { demo: n(648) } } })
  },
  648: function (e, t, n) {
    e.exports = n.p + 'medias/demo.7d883e2b.mp3'
  },
  649: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 }),
      (t.default = {
        'de-de':
          '*{font-family:"微软雅黑", "Helvetica", sans-serif !important}\n',
        'en-us':
          '*{font-family:"微软雅黑", "Microsoft YaHei", "Neuropolitical", sans-serif !important}\n',
        'fr-fr':
          '*{font-family:"Helvetica", "Helvetica Neue Pro", sans-serif !important}\n',
        'id-id':
          '*{font-family:"微软雅黑", "Helvetica", sans-serif !important}\n',
        'es-es': '.demo{font-size:12px}\n',
        'ja-jp':
          '*{font-family:"游ゴシック体", Yu Gothic, "YuGothic", "ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro", "メイリオ", Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif !important}\n',
        'pt-pt': '.demo{font-size:12px}\n',
        'ko-kr':
          '*{font-family:"(환)태나루체", "Adobe 고딕 Std", sans-serif !important}\n',
        'ru-ru': '.demo{font-size:12px}\n',
        'th-th':
          '*{font-family:"Kanit", "TH Sarabun New", sans-serif !important}\n',
        'zh-cn': '.demo{font-size:12px}\n',
        'vi-vn':
          '*{font-family:"Corbel", "Tahoma Regular", "Tahoma Bold", sans-serif !important}\n',
        'zh-tw': '.demo{font-size:12px}\n',
      })
  },
  650: function (e, t, n) {},
  91: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    ;(t.environment = 'production'), (t.apiBase = consts.apiBase)
  },
  92: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = o(n(527)),
      i = o(n(528)),
      a = n(596)
    function o(e) {
      return e && e.__esModule ? e : { default: e }
    }
    t.default = function (e) {
      e.use(r.default)
      var t = new r.default({ routes: i.default })
      return (
        t.beforeEach(function (t, n, r) {
          a.beforeRouterUpdate.bind(e)(t, n, r)
        }),
        t.afterEach(function (t, n) {
          a.afterRouterUpdate.bind(e)(t, n)
        }),
        { router: t }
      )
    }
  },
  95: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(96),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
  96: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r,
      i = n(154),
      a = (r = i) && r.__esModule ? r : { default: r },
      o = n(230),
      u = n(38),
      s = n(155)
    n(530),
      (t.default = {
        name: 'home',
        props: {
          createGal: Function,
          novelData: {
            type: Object,
            default: function () {
              return {}
            },
          },
        },
        computed: {
          novelFinished: function () {
            return this.novelData && '1' === this.novelData.is_finished
          },
          startReadingText: function () {
            return i18n.start
          },
        },
        data: function () {
          return { hasSaveData: this.getSaveData(), showClose: !1 }
        },
        mounted: function () {
          var e = this
          this.$bbsApp.appVersion &&
            this.$bbsApp.getHTTPRequestHeaders().then(function (t) {
              if (0 === t.retcode) {
                var n = t.data['x-rpc-device_model']
                ;/iphone/i.test(n) || (e.showClose = !0)
              }
            })
        },
        methods: {
          start: function () {
            var e = this,
              t = this.getNew()
            this.createGal(t.chapter, t.sceneId, void 0, !1, function () {
              console.log(e.getSaveData(), 'save data')
              e.hasSaveData = e.getSaveData()
            })
          },
          getNew: function () {
            var e = _.orderBy(
              _.filter(this.novelData.chapters, function (e) {
                return (
                  0 === Number(e.type) &&
                  Number(e.order) < 100 &&
                  e.parts.length
                )
              }),
              function (e) {
                return Number(e.order)
              },
              'asc'
            )
            // Load first always
            var t = _.first(e),
              n = _.get(t, 'parts')
            return {
              chapter: t,
              sceneId: _.get(
                _.first(
                  _.orderBy(
                    n,
                    function (e) {
                      return Number(e.order)
                    },
                    'asc'
                  )
                ),
                'scene_id'
              ),
            }
            // if ('1' === this.novelData.is_finished) {
            //   var t = _.first(e),
            //     n = _.get(t, 'parts')
            //   return {
            //     chapter: t,
            //     sceneId: _.get(
            //       _.first(
            //         _.orderBy(
            //           n,
            //           function (e) {
            //             return Number(e.order)
            //           },
            //           'asc'
            //         )
            //       ),
            //       'scene_id'
            //     ),
            //   }
            // }
            // var r = _.last(e),
            //   i = _.get(r, 'parts'),
            //   a = _.orderBy(
            //     _.filter(i, function (e) {
            //       return 1 === Number(e.is_newest)
            //     }),
            //     function (e) {
            //       return Number(e.order)
            //     },
            //     'asc'
            //   ),
            //   o = _.last(a)
            // return { chapter: r, sceneId: o ? o.scene_id : void 0 }
          },
          getSaveData: function () {
            return a.default.readAutoSaveData('gal_' + o.NOVEL_NAME)
          },
          continueRead: function () {
            var e = this,
              t = this.getSaveData()
            if (t) {
              var n = _.find(this.novelData.chapters, function (e) {
                return e.id === t.cid
              })
              this.createGal(n, t.sceneId, t.currentScriptId, !0, function () {
                e.hasSaveData = e.getSaveData()
              })
            }
          },
          needLogin: function () {
            this.$toast({ content: this.$MI18N.WORD.needLoginText })
          },
          closePage: function () {
            var e = u.memoryCache.get(s.CACHE_SOUND_INST)
            e && e.stop(null, null, !1), this.$bbsApp.closePage()
          },
        },
      })
  },
  97: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(98),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
  98: function (e, t, n) {
    'use strict'
    Object.defineProperty(t, '__esModule', { value: !0 })
    var r = s(n(231)),
      i = s(n(537)),
      a = s(n(577)),
      o = s(n(157)),
      u = s(n(580))
    function s(e) {
      return e && e.__esModule ? e : { default: e }
    }
    n(583),
      (t.default = {
        name: 'chapter-list',
        components: { pager: o.default, chapter: u.default },
        props: {
          createGal: Function,
          novelData: {
            type: Object,
            default: function () {
              return {}
            },
          },
        },
        data: function () {
          var e =
            this.novelData && this.novelData.chapters
              ? this.novelData.chapters
              : []
          return {
            page: 1,
            pageSize: 2,
            list: (0, a.default)(e, function (e) {
              return '1' !== e.type && e.parts.length
            }),
          }
        },
        computed: {
          currentList: function () {
            var e = (0, i.default)(
              this.list,
              function (e) {
                return Number(e.order)
              },
              'asc'
            )
            return (0, r.default)(
              e,
              (this.page - 1) * this.pageSize,
              this.page * this.pageSize
            )
          },
          totalPage: function () {
            return Math.ceil(this.list.length / this.pageSize)
          },
        },
      })
  },
  99: function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(100),
      i = n.n(r)
    for (var a in r)
      ['default'].indexOf(a) < 0 &&
        (function (e) {
          n.d(t, e, function () {
            return r[e]
          })
        })(a)
    t.default = i.a
  },
})

/**
 * Resolve archive item id and save it
 * @param {string} t aid
 * @returns
 */
function handleAchievement(t) {
  const archiveItemId = getArchiveItemIdByAid(t)
  if (archiveItemId == null) {
    return
  }
  addArchiveItemId(archiveItemId)
}

/**
 * Extend Achievements list from saved archive item ids
 * @param {unknown[]} existingList
 * @returns
 */
function appendExtraAchievements(existingList) {
  const ids = getArchiveItemIds()
  const extraAchievements = ids.map((id) => {
    return archiveItems.find((item) => item.id === id)
  })
  return [...existingList, ...extraAchievements]
}

function getArchiveItemIdByAid(aid) {
  switch (aid) {
    case 'fdc3d5e2f6d96f8d': // sushang
      return '2'
    case 'c6045ef06bed0a3f': // eagle
      return '13'
    case 'otto':
      return '3'
    case '0587835ecd47f23d': // otto update #1
      return '20'
    case '809d736ce396e092': // sumei
      return '5'
    case 'fcf2a1388f09b18b': // lin zhaoyu
      return '4'
    case 'f264952df7ffa72c': // qin suyi
      return '10'
    case 'c6df415ec80024b4': //otto update #2
      return '19'
    case 'f2980e56d3697a89': // ma feima
      return '9'
    case '0ecde88422bfcefe': // ma update
      return '21'
    case 'c6a6ddc0c3d637d9': // lingshuang
      return '8'
    case '96d0ac44fb43c563': // jingwei
      return '1'
    case 'abf384293a81b6c7': // phantom
      return '12'
    case '2e4bba1abf781c9f': // li shin
      return '11'
    default:
      return null
  }
}

const archiveItemsKey = '7s:archiveItems'
function addArchiveItemId(id) {
  const currentItemSet = new Set(getArchiveItemIds())
  currentItemSet.add(id)
  localStorage.setItem(archiveItemsKey, JSON.stringify([...currentItemSet]))
}

const defaultItemIds = ['18']
function getArchiveItemIds() {
  try {
    const rawData = localStorage.getItem(archiveItemsKey)
    if (rawData == null) {
      return defaultItemIds
    }
    return JSON.parse(rawData)
  } catch (error) {
    console.warn('Cannot parse archive items data:')
    console.warn(error)
  }
  return defaultItemIds
}
