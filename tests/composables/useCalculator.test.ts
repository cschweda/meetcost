import { describe, it, expect } from 'vitest'
import { useCalculator } from '~/composables/useCalculator'
import type { Participant } from '~/types'

function fulltimeParticipant(id: string, annualSalary: number): Participant {
  return {
    id,
    employmentType: 'fulltime',
    annualSalary,
    effectiveHourlyRate: annualSalary / 2080,
    isActive: true,
  }
}

function contractorParticipant(id: string, hourlyRate: number): Participant {
  return {
    id,
    employmentType: 'contractor',
    hourlyRate,
    effectiveHourlyRate: hourlyRate,
    isActive: true,
  }
}

describe('useCalculator', () => {
  const { buildMeeting, createParticipantsFromQuickMode } = useCalculator()

  describe('buildMeeting', () => {
    it('returns meeting with correct structure', () => {
      const participants = [
        fulltimeParticipant('1', 90000),
        contractorParticipant('2', 60),
      ]
      const timestamp = Date.now() - 3600000
      const meeting = buildMeeting(
        participants,
        3600,
        timestamp,
        'private',
        'Stand Up'
      )

      expect(meeting.id).toMatch(/^mtg_\d+$/)
      expect(meeting.timestamp).toBe(timestamp)
      expect(meeting.duration).toBe(3600)
      expect(meeting.participants).toHaveLength(2)
      expect(meeting.totalCost).toBeGreaterThan(0)
      expect(meeting.costPerSecond).toBeGreaterThan(0)
      expect(meeting.costPerMinute).toBe(meeting.costPerSecond * 60)
      expect(meeting.averageRate).toBeGreaterThan(0)
      expect(meeting.status).toBe('completed')
      expect(meeting.sectorType).toBe('private')
      expect(meeting.meetingDescription).toBe('Stand Up')
    })

    it('calculates totalCost from participants and duration', () => {
      const participants = [
        fulltimeParticipant('1', 90000),
        contractorParticipant('2', 60),
      ]
      const meeting = buildMeeting(participants, 1800, Date.now())
      const expectedRate =
        participants[0].effectiveHourlyRate + participants[1].effectiveHourlyRate
      const expectedCost = (expectedRate / 3600) * 1800
      expect(meeting.totalCost).toBeCloseTo(expectedCost, 2)
    })

    it('sanitizes meetingDescription', () => {
      const participants = [fulltimeParticipant('1', 90000)]
      const meeting = buildMeeting(
        participants,
        60,
        Date.now(),
        undefined,
        '<script>xss</script>'
      )
      expect(meeting.meetingDescription).not.toContain('<')
      expect(meeting.meetingDescription).toContain('xss')
    })

    it('remote meeting has no inPersonCost', () => {
      const participants = [
        fulltimeParticipant('1', 90000),
        contractorParticipant('2', 60),
      ]
      const meeting = buildMeeting(
        participants,
        3600,
        Date.now(),
        undefined,
        'Stand Up',
        undefined,
        'remote'
      )
      expect(meeting.inPersonCost).toBeUndefined()
      expect(meeting.meetingCost).toBeDefined()
      expect(meeting.totalCost).toBe(meeting.meetingCost)
      expect(meeting.format).toBe('remote')
    })

    it('in-person meeting with tax adds inPersonCost to totalCost', () => {
      const participants = [
        fulltimeParticipant('1', 90000),
        fulltimeParticipant('2', 90000),
      ]
      const meeting = buildMeeting(
        participants,
        3600,
        Date.now(),
        undefined,
        'Kickoff',
        undefined,
        'in-person',
        true,
        30,
        20
      )
      expect(meeting.format).toBe('in-person')
      expect(meeting.inPersonCost).toBeDefined()
      expect(meeting.inPersonCost).toBeGreaterThan(0)
      expect(meeting.meetingCost).toBeDefined()
      expect(meeting.totalCost).toBe(meeting.meetingCost! + meeting.inPersonCost!)
      expect(meeting.commuteMinutesPerPerson).toBe(30)
      expect(meeting.inPersonExtrasPerPerson).toBe(20)
    })

    it('in-person without applyInPersonTax has no inPersonCost', () => {
      const participants = [fulltimeParticipant('1', 90000)]
      const meeting = buildMeeting(
        participants,
        3600,
        Date.now(),
        undefined,
        'Stand Up',
        undefined,
        'in-person',
        false,
        30
      )
      expect(meeting.inPersonCost).toBeUndefined()
      expect(meeting.totalCost).toBe(meeting.meetingCost)
    })
  })

  describe('createParticipantsFromQuickMode', () => {
    it('creates full-time participants from salary', () => {
      const participants = createParticipantsFromQuickMode(3, 'salary', 90000)
      expect(participants).toHaveLength(3)
      participants.forEach((p) => {
        expect(p.employmentType).toBe('fulltime')
        expect(p.annualSalary).toBe(90000)
        expect(p.effectiveHourlyRate).toBeCloseTo(90000 / 2080, 2)
        expect(p.isActive).toBe(true)
      })
    })

    it('creates contractor participants from hourly rate', () => {
      const participants = createParticipantsFromQuickMode(2, 'hourly', 75)
      expect(participants).toHaveLength(2)
      participants.forEach((p) => {
        expect(p.employmentType).toBe('contractor')
        expect(p.hourlyRate).toBe(75)
        expect(p.effectiveHourlyRate).toBe(75)
        expect(p.isActive).toBe(true)
      })
    })
  })
})
