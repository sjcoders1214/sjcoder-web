import './style.css';
import { initPage, initReveal } from './common.js';
import { jobs } from './jobs-data.js';

function jobCard(job) {
  const applyBody = `Dear SJ Coders Team,

I would like to apply for the ${job.title} position.

A little about myself:
[Share your background, relevant skills, and why you're a good fit]

I have attached my resume for your reference.

Regards,
[Your Name]
[Phone Number]`;
  const applyHref = `mailto:${job.applyEmail}?subject=${encodeURIComponent(job.applySubject)}&body=${encodeURIComponent(applyBody)}`;
  return `
    <details class="job-card glass-card reveal">
      <summary class="job-summary">
        <div class="job-summary-info">
          <span class="job-badge">${job.status}</span>
          <h3>${job.title}</h3>
          <div class="job-meta">
            <span class="job-meta-item"><i data-lucide="clock"></i>${job.duration}</span>
            <span class="job-meta-item"><i data-lucide="indian-rupee"></i>${job.stipend}</span>
          </div>
        </div>
        <i data-lucide="chevron-down" class="job-chevron"></i>
      </summary>
      <div class="job-body">
        <div class="job-tags">
          ${job.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="job-details">
          <div>
            <h4><i data-lucide="user-check"></i> Who Can Apply?</h4>
            <ul>${job.whoCanApply.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div>
            <h4><i data-lucide="gift"></i> What You'll Get</h4>
            <ul>${job.whatYouGet.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="job-apply">
          <a href="${applyHref}" class="btn btn-primary">Apply Now <i data-lucide="send"></i></a>
          <p><i data-lucide="mail"></i> Or email your resume to <a href="mailto:${job.applyEmail}">${job.applyEmail}</a>
            with subject "${job.applySubject}"</p>
        </div>
      </div>
    </details>
  `;
}

function renderJobs() {
  const container = document.getElementById('jobsList');
  if (!container) return;

  container.innerHTML = jobs.length
    ? jobs.map(jobCard).join('')
    : `<div class="no-openings glass-card reveal">No open positions right now — check back soon, or send your
        resume to <a href="mailto:info@sjcoders.com">info@sjcoders.com</a> and we'll reach out when a role opens up.</div>`;

  if (window.lucide) lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  initPage();
  renderJobs();
  initReveal();
});
